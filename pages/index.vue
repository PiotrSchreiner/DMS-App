<script setup>
const supabase = useSupabaseClient();
const documents = ref([]);

async function fetchDocuments() {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fehler beim Laden:", error);
  } else {
    documents.value = data;
  }
}

onMounted(() => {
  fetchDocuments();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-extrabold text-gray-900">DMS Dokumente</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Upload
        </button>
      </header>

      <div class="bg-white shadow-md rounded-xl overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
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
                Typ
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Datum
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="doc in documents" :key="doc.id">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ doc.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ doc.file_type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(doc.created_at).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="documents.length === 0"
          class="p-12 text-center text-gray-500"
        >
          Noch keine Dokumente hochgeladen.
        </div>
      </div>
    </div>
  </div>
</template>
