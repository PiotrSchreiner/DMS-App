<script setup>
const supabase = useSupabaseClient();
const documents = ref([]);
const uploading = ref(false);
const selectedFile = ref(null);

async function fetchDocuments() {
  const { data } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });
  documents.value = data || [];
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
    await supabase.from("documents").insert({
      name: file.name,
      file_path: storageData.path,
      file_type: file.type,
      size_kb: Math.round(file.size / 1024),
    });
    selectedFile.value = null;
    await fetchDocuments();
  }

  uploading.value = false;
}

onMounted(() => {
  fetchDocuments();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <header class="mb-8">
        <h1 class="text-3xl font-bold">DMS Dashboard</h1>
      </header>

      <div class="bg-white p-6 rounded-xl shadow-sm mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Datei auswählen</label
        >
        <div class="flex items-center gap-4">
          <input
            type="file"
            @change="handleFileSelection"
            data-testid="file-input"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            @click="uploadFile"
            :disabled="!selectedFile || uploading"
            data-testid="upload-button"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {{ uploading ? "Lädt..." : "Upload" }}
          </button>
        </div>
      </div>

      <div class="bg-white shadow-sm rounded-xl overflow-hidden">
        <table
          class="min-w-full divide-y divide-gray-200"
          data-testid="document-table"
        >
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Datum
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="doc in documents"
              :key="doc.id"
              data-testid="document-row"
            >
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ doc.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ new Date(doc.created_at).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="documents.length === 0"
          class="p-10 text-center text-gray-400"
        >
          Noch keine Dokumente vorhanden.
        </div>
      </div>
    </div>
  </div>
</template>
