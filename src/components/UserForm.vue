<template>
    <va-form ref="form">
     <va-select style="max-width: 300px;"
     class="mb-4"
        label="Tipo Alloggiato"
        :options='options'
        v-model='selected_alloggio'
        text-by= "Descrizione"
        value-by="Codice"
      />
      {{selected_alloggio}}
    <va-select style="max-width: 300px;"
     class="mb-4"
        label="Comuni"
        :options='optionss'
        v-model='selected_comune'
        text-by= "Descrizione"
        value-by="Codice"
        searchable
      />
    </va-form>

<!--  <va-data-table :items="items" :columns="columns" striped>
    <template #headerAppend>
      <tr class="table-example--slot">
        <th v-for="key in Object.keys(createdItem)" :key="key" colspan="1">
          <va-input :placeholder="key" v-model="createdItem[key]" />
        </th>
        <th colspan="1">
          <va-button @click="addNewItem()" :disabled="!isNewData">
            Add
          </va-button>
        </th> 
      </tr>
    </template>

    <template #cell(actions)="{ rowIndex }">
      <va-button flat icon="edit" @click="openModalToEditItemById(rowIndex)" />
      <va-button flat icon="delete" @click="deleteItemById(rowIndex)" />
    </template>
  </va-data-table>

  <va-modal
    :model-value="!!editedItem"
    message="Edit item"
    @ok="editItem()"
    @cancel="resetEditedItem()"
  >
    <slot>
      <va-input
        v-for="key in Object.keys(editedItem)"
        :key="key"
        class="my-3"
        :label="key"
        v-model="editedItem[key]"
      />
    </slot>
  </va-modal> -->
</template>

<script>
import { defineComponent } from "vue";
import comuni from '../data/comuni.csv'
import stati from '../data/stati.csv'
// import documenti from '../data/documenti.csv'
import tipo_alloggiato from '../data/tipo_alloggiato.csv';


const defaultItem = {
};
// const tipo_alloggiato_path = '../data/tipo_alloggiato.csv';
//'../data/documenti.csv'

export default defineComponent({
  
  data() {
    const items = [
      { 
        id: 0,
        cittadinanza: 0,
        cognome: "santonastaso",
        data_arrivo: "1995-03-02 09:18:01",
        data_nascita: "1995-03-02 09:18:01",
        data_partenza: "2167-03-02 22:54:00",
        // desc_cittadinanza: "asdsads",
        // desc_comune_nascita: "dfsadfad",
        // desc_provincia_nascita: "asdsad",
        // desc_sesso: "sadsd",
        // desc_stato_nascita: "asdsad",
        // desc_tipo_alloggiato: "asdsadas",
        comune_nascita: 0,
        provincia_nascita: 0,
        stato_nascita: 0,
        luogo_rilascio_documento: "asdadsa",
        nome: "emanuele",
        numero_documento: "asdsadd",
        sesso: 0,
        tipo_alloggiato: 0,
        tipo_documento: "dasdasd"
      },
    ];
    const columns = [
      { key: "id", sortable: true },
      {key: "nome", sortable: true},
      {key: "cognome", sortable: true},
      {key: "sesso", sortable: true},
      {key: "data_nascita", sortable: true},
      {key: "comune_nascita", sortable: true},
      {key: "provincia_nascita", sortable: true},
      {key: "stato_nascita", sortable: true},
      {key: "cittadinanza", sortable: true},

      {key: "tipo_documento", sortable: true},
      {key: "numero_documento", sortable: true},
      {key: "luogo_rilascio_documento", sortable: true},
      {key: "data_arrivo", sortable: true},
      {key: "data_partenza", sortable: true},
      {key: "tipo_alloggiato", sortable: true},
      // {key: "desc_cittadinanza", sortable: true},
      // {key: "desc_comune_nascita", sortable: true},
      // {key: "desc_provincia_nascita", sortable: true},
      // {key: "desc_sesso", sortable: true},
      // {key: "desc_stato_nascita", sortable: true},
      // {key: "desc_tipo_alloggiato", sortable: true},
      { key: "actions", width: 80 },
    ];
    // const comuni = d3.csv('../data/comuni.csv')
    // const tipo_alloggiato = 
    return {
      items,
      columns,
      // comuni,
      tipo_alloggiato: tipo_alloggiato,
      stati: stati,
      hello: comuni,
      selected_alloggio: '',
      selected_comune: '',
      editedItemId: null,
      editedItem: null,
      createdItem: { ...defaultItem },
    };
  },

  computed: {
    isNewData() {
      return Object.keys(this.createdItem).every(
        (key) => !!this.createdItem[key]
      );
    },
     options() {
       // console.log(this.tipo_alloggiato)
       return this.tipo_alloggiato
     },
     optionss() {
      console.log(this.stati)
       return this.stati
     },
  },
  mounted() {
    console.log('App loaded!')
  },
  methods: {
    async fetchData() {
    },
    resetEditedItem() {
      this.editedItem = null;
      this.editedItemId = null;
    },
    resetCreatedItem() {
      this.createdItem = { ...defaultItem };
    },
    deleteItemById(id) {
      this.items = [...this.items.slice(0, id), ...this.items.slice(id + 1)];
    },
    addNewItem() {
      this.items = [...this.items, { ...this.createdItem }];
      this.resetCreatedItem();
    },
    editItem() {
      this.items = [
        ...this.items.slice(0, this.editedItemId),
        { ...this.editedItem },
        ...this.items.slice(this.editedItemId + 1),
      ];
      this.resetEditedItem();
    },
    openModalToEditItemById(id) {
      this.editedItemId = id;
      this.editedItem = { ...this.items[id] };
    },
  },
  });
</script>

<style lang="scss" scoped>
.table-example--slot {
  th {
    padding-top: 25px;
    padding-bottom: 5px;
    vertical-align: middle;
  }
}
</style>
