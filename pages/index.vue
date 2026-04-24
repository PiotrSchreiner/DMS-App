<script setup>
const supabase = useSupabaseClient();
const documents = ref([]);
const uploading = ref(false);
const selectedFile = ref(null);
const searchQuery = ref("");

async function fetchDocuments() {
  const { data } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
  documents.value = data || [];
}

const filteredDocuments = computed(() => {
  if (!searchQuery.value) return documents.value;
  return documents.value.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

function getPublicUrl(path) {
  const { data } = supabase.storage.from("files").getPublicUrl(path);
  return data.publicUrl;
}

async function deleteDocument(doc) {
  if (!confirm(`Möchtest du "${doc.name}" wirklich löschen?`)) return;

  try {
    await supabase.storage.from("files").remove([doc.file_path]);
  } catch (e) {
    console.log("Datei war im Storage wohl schon weg.");
  }

  const { error } = await supabase.from("documents").delete().eq("id", doc.id);

  if (!error) {
    documents.value = documents.value.filter((d) => d.id !== doc.id);
    console.log("Eintrag erfolgreich entfernt.");
  } else {
    console.error("DB-Löschfehler:", error.message);
  }
}

function handleFileSelection(event) {
  selectedFile.value = event.target.files[0];
}

async function uploadFile() {
  if (!selectedFile.value) return;
  uploading.value = true;
  const file = selectedFile.value;
  const fileName = `${Date.now()}-${file.name}`;

  const { data: storageData, error: storageError } = await supabase.storage
    .from("files")
    .upload(fileName, file);

  if (!storageError) {
    const { data: dbData } = await supabase
      .from("documents")
      .insert({
        name: file.name,
        file_path: storageData.path,
        file_type: file.type,
        size_kb: Math.round(file.size / 1024),
      })
      .select();

    if (dbData) documents.value.unshift(dbData[0]);
    selectedFile.value = null;
  }
  uploading.value = false;
}

onMounted(() => fetchDocuments());
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 text-black font-sans">
    <div class="max-w-5xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold italic uppercase tracking-tighter">
          DMS Dashboard
        </h1>
        <div
          class="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold"
        >
          {{ documents.length }} Dokumente
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label
            class="block text-xs font-bold text-gray-400 uppercase mb-2 italic"
            >Suche</label
          >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Dateiname suchen..."
            class="w-full border-gray-200 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label
            class="block text-xs font-bold text-gray-400 uppercase mb-2 italic"
            >Neuer Upload</label
          >
          <div class="flex gap-2">
            <input
              type="file"
              @change="handleFileSelection"
              class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 font-bold"
            />
            <button
              @click="uploadFile"
              :disabled="!selectedFile || uploading"
              class="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold disabled:bg-gray-200 transition hover:bg-blue-700 shadow-md"
            >
              {{ uploading ? "..." : "Upload" }}
            </button>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-100">
              <th class="p-4 text-xs font-bold text-gray-400 uppercase italic">
                Vorschau
              </th>
              <th class="p-4 text-xs font-bold text-gray-400 uppercase italic">
                Name
              </th>
              <th
                class="p-4 text-xs font-bold text-gray-400 uppercase italic text-right"
              >
                Aktionen
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="doc in filteredDocuments"
              :key="doc.id"
              class="border-b border-gray-50 hover:bg-blue-50/50 transition"
            >
              <td class="p-4">
                <img
                  v-if="doc.file_type?.includes('image')"
                  :src="getPublicUrl(doc.file_path)"
                  class="w-12 h-12 object-cover rounded-lg shadow-sm border border-white"
                />
                <div
                  v-else
                  class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-[10px] font-black text-gray-500 uppercase"
                >
                  {{ doc.file_type?.split("/")[1] || "??" }}
                </div>
              </td>
              <td class="p-4 font-semibold text-gray-800">{{ doc.name }}</td>
              <td class="p-4 text-right">
                <div class="flex justify-end gap-4">
                  <a
                    :href="getPublicUrl(doc.file_path)"
                    target="_blank"
                    class="text-blue-600 hover:scale-110 transition font-bold text-sm"
                    >Öffnen</a
                  >
                  <button
                    @click="deleteDocument(doc)"
                    class="text-red-500 hover:scale-110 transition font-bold text-sm"
                  >
                    Löschen
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="filteredDocuments.length === 0"
          class="p-20 text-center text-gray-300 font-medium italic"
        >
          Keine Dateien gefunden.
        </div>
      </div>
    </div>
  </div>
</template>
