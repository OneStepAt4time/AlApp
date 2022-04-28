<template>

  <div class="row">
    <va-select
      label="Tipo Alloggiato"
      :options="tipi_alloggiato"
      v-model="createdItem.tipo_alloggiato"
      text-by="Descrizione"
      value-by="Codice"
      clearable
    />
    <va-date-input
      class="display-7"
      label="Date di permanenza"
      v-model="date_permanenza"
      clearable
      mode="range"
    />
  </div>
  <div class="row">
      <va-input
        class="flex"
        label="Nome"
        placeholder=""
        v-model="createdItem.nome"
        clearable
      />

      <va-input
        class="flex"
        label="Cognome"
        placeholder=""
        v-model="createdItem.cognome"
        clearable
      />
      <va-select
        class="flex"
        label="Sesso"
        :options="tipi_sesso"
        v-model="createdItem.sesso"
        text-by="Sesso"
        value-by="Codice"
        clearable
      />
  </div>
    <div class="row">
  <va-date-input
    class="display-7"
    label="Data di Nascita"
    placeholder="Seleziona la data"
    v-model="createdItem.data_nascita"
    clearable
  />
  {{ formatDate(createdItem.data_nascita) }}

  <va-select
    label="Stato di Nascita"
    :options="tipi_stati"
    v-model="createdItem.stato_nascita"
    text-by="Descrizione"
    value-by="Codice"
    outline
    searchable
    clearable
    track-by="Codice"
  />
  <va-select
    label="Provincia di Nascita"
    :options="tipi_province"
    v-model="createdItem.provincia_nascita"
    text-by="Provincia"
    value-by="Sigla"
    outline
    searchable
    clearable
    track-by="Sigla"
  />
  <va-select
    label="Comune nascita"
    :options="find_comune"
    v-model="createdItem.comune_nascita"
    text-by="Descrizione"
    value-by="Codice"
    outline
    :loading="false"
    searchable
    clearable
  />
    </div>
    <div class="row">
  <va-select
    label="Cittadinanza"
    :options="tipi_stati"
    v-model="createdItem.cittadinanza"
    text-by="Descrizione"
    value-by="Codice"
    outline
    searchable
    clearable
    track-by="Codice"
  />

  <va-select
    label="Tipo documento"
    :options="tipi_documento"
    v-model="createdItem.tipo_documento"
    text-by="Descrizione"
    value-by="Codice"
    outline
    searchable
    clearable
    :readonly="set_readonly()"
    track-by="Codice"
  />

  <va-input
    label="Numero documento"
    placeholder=""
    v-model="createdItem.numero_documento"
    clearable
  />
  </div>
  <div class="px-2">
    <va-button  @click="addNewItem()" > Aggiungi </va-button>
  </div>
  
  <va-divider>
      <span class="px-2">Tabella</span>
  </va-divider>

    <va-input
      class="mb-4"
      type="textarea"
      v-model="write_text"
      placeholder="Anteprima del file txt"
      readonly
    />

  <va-divider>
      <span class="px-2">Tabella</span>
  </va-divider>

  <va-data-table :items="items" :columns="columns" striped>
    <template #headerAppend>
      <tr class="table-example--slot">
        <th v-for="key in Object.keys(createdItem)" :key="key" colspan="1">
          <!-- <va-input :placeholder="key" v-model="createdItem[value]" />  -->
        </th>
        <th colspan="1">
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
  </va-modal>  
</template>

<script>
import { defineComponent } from "vue";
import sesso from "../data/sesso.csv";
import comuni from "../data/comuni.csv";
import stati from "../data/stati.csv";
import documenti from "../data/documenti.csv";
import tipo_alloggiato from "../data/tipo_alloggiato.csv";
import province from '../data/province-sigle.csv';

const defaultItem = {
  tipo_alloggiato: "",
  provincia_nascita: "",
  luogo_rilascio_documento: "",
};

export default defineComponent({
  name: 'form-elements',
  data() {
    const items = [
      {
        // id: 0,
        // cittadinanza: "",
        // cognome: "",
        // data_arrivo: "",
        // data_nascita: "",
        // data_partenza: "",
        // comune_nascita: 0,
        // provincia_nascita: 0,
        // stato_nascita: 0,
        // luogo_rilascio_documento: "",
        // nome: "",
        // numero_documento: "",
        // sesso: 0,
        // tipo_alloggiato: 0,
        // tipo_documento: "",
      },
    ];
    const columns = [
      { key: "id", sortable: true, value: 1 },
      { key: "nome", sortable: true, value: this.input_tipo_documento },
      { key: "cognome", sortable: true },
      { key: "sesso", sortable: true },
      { key: "data_nascita", sortable: true },
      { key: "comune_nascita", sortable: true },
      { key: "provincia_nascita", sortable: true },
      { key: "stato_nascita", sortable: true },
      { key: "cittadinanza", sortable: true },

      { key: "tipo_documento", sortable: true },
      { key: "numero_documento", sortable: true },
      { key: "luogo_rilascio_documento", sortable: true },
      { key: "data_arrivo", sortable: true },
      { key: "data_partenza", sortable: true },
      { key: "tipo_alloggiato", sortable: true },
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
      date_permanenza: {
          start: null,
          end: null
      },
      editedItemId: null,
      editedItem: null,
      createdItem: { ...defaultItem },
      tipo_alloggiato: tipo_alloggiato,
      sesso: sesso,
      stati: stati,
      province: province,
      comuni: comuni,
      temp: "",
      documenti: documenti,
    };
  },

  computed: {
    isNewData() {
      return Object.keys(this.createdItem).every(
        (key) => !!this.createdItem[key]
      );
    },
    find_comune() {
      let prov = this.createdItem.provincia_nascita
      console.log(this.temp)
      let t = this.comuni
      let tt = t.filter( function(el) {return el.Provincia==prov & el.DataFineVal===null}
      )    
      console.log(tt)
      return tt
    },
    tipi_alloggiato() {
      // console.log(this.tipo_alloggiato)
      return this.tipo_alloggiato;
    },
    tipi_sesso() {
      // console.log(this.sesso)
      return this.sesso;
    },
    tipi_comuni() {
      var local_comuni = this.comuni
      // console.log(this.comuni);
      return local_comuni;
    },
    tipi_province() {
      // console.log(this.provincie)
      return this.province;
    },
    tipi_stati() {
      // console.log(this.comuni);
      return this.stati;
    },
    tipi_documento() {
      // console.log(this.documenti);
      return this.documenti;
    },
    write_text() {
      let plain_text = ""
      let temp_items = this.items
      console.log('temp' + temp_items.toString())
      for (let i in temp_items) {
        let item = temp_items[parseInt(i)]
        if (Boolean(item.tipo_alloggiato)=== true) {
          plain_text+=item.tipo_alloggiato+"\n"
        } else {
          continue
        }
      }   
    console.log('plain: \t'+plain_text)     
    return plain_text!="" ? plain_text : ""
    }
  },
  mounted() {
    this.temp = "";
    console.log("App loaded!");
  },
  methods: {
    async fetchData() {
      return this.items.toString()
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
      this.createdItem.tipo_alloggiato = this.createdItem.tipo_alloggiato.toString().padStart(2, ' ')
      this.createdItem.data_arrivo = this.formatDate(this.date_permanenza.start)
      this.createdItem.giorni_permanenza = parseInt((this.date_permanenza.end - this.date_permanenza.start)/(24*60*60*1e3)).toString().padStart(2, '0')
     // this.createdItem.giorni_permanenza = this.formatDate(this.createdItem.giorni_permanenza)
      this.createdItem.data_nascita = this.formatDate(this.createdItem.data_nascita)
      this.items = [...this.items, { ...this.createdItem }];
      this.resetCreatedItem();
    },
    formatDate(date) {
      function padTo2Digits(num) {
        return num.toString().padStart(2, "0");
      }
      let current_date = new Date()
      try {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join("/");
      } catch (error) {
        return [
          padTo2Digits(current_date.getDate()),
          padTo2Digits(current_date.getMonth() + 1),
          current_date.getFullYear(),
        ].join("/");
      }
    },
    editItem() {
      console.log(this.items);
      this.editedItem.data_nascita = this.formatDate(this.editedItem.data_nascita)
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
    set_readonly() {
        if (this.createdItem.tipo_alloggiato  == 19 || this.createdItem.tipo_alloggiato == 20) {
          return true
        } else {
          return false
        }
    }
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
  .row.row-inside {
    max-width: none;
  }

  .va-input-wrapper, fieldset {
    margin-bottom: 0.5rem;
  }
</style>
