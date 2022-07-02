<template>

  <div class="row flex"  style="margin-left=5px; margin-right=5px;">
    <va-select style="margin: 0px;"
      label="Tipo Alloggiato"
      :options="tipi_alloggiato"
      v-model="createdItem.tipo_alloggiato"
      text-by="Descrizione"
      value-by="Codice"
      required
      clearable
    />
    <va-date-input style="margin: 0px;"
      class="display-7"
      label="Date di permanenza"
      v-model="date_permanenza"
      clearable
      mode="range"
    />
  </div>

  <div class="row flex">

      <va-input style="margin: 0px;"
        label="Nome"
        placeholder=""
        v-model="createdItem.nome"
        clearable
      />

      <va-input style="margin: 0px;"
        label="Cognome"
        placeholder=""
        v-model="createdItem.cognome"
        clearable
      />
      <va-select style="margin: 0px;"
        label="Sesso"
        :options="tipi_sesso"
        v-model="createdItem.sesso"
        text-by="Sesso"
        value-by="Codice"
        clearable
      />
    
  </div>
  
    <div class="row flex">
  <va-date-input style="margin: 0px;"
    label="Data di Nascita"
    placeholder="Seleziona la data"
    v-model="createdItem.data_nascita"
    mode="single"
    clearable
  />
  <va-select style="margin: 0px;"
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
  <va-select style="margin: 0px;"
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
  <va-select style="margin: 0px;"
    label="Comune nascita"
    :options="find_comune_nascita"
    v-model="createdItem.comune_nascita"
    text-by="Descrizione"
    value-by="Codice"
    outline
    :loading="false"
    searchable
    clearable
  />
 </div>
  <div>
    <div class="row flex gutter--md">
  <va-select style="margin: 0px;"
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

  <va-select  style="margin: 0px;"
    label="Tipo documento"
    :options="tipi_documento"
    v-model="createdItem.tipo_documento"
    text-by="Descrizione"
    value-by="Codice"
    outline
    searchable
    clearable
    track-by="Codice"
  />
  <va-input style="margin: 0px;"
    label="Numero documento"
    v-model="createdItem.numero_documento"
    clearable
  />
  <div class="row flex gutter--md">
  <va-select style="margin: 0px;"
    label="Stato di rilascio documento"
    :options="tipi_stati"
    v-model="createdItem.stato_rilascio_documento"
    text-by="Descrizione"
    value-by="Codice"
    outline
    searchable
    clearable
    track-by="Codice"
  />
  <va-select style="margin: 0px;"
    label="Provincia di rilascio documento"
    :options="tipi_province"
    v-model="createdItem.provincia_rilascio_documento"
    text-by="Provincia"
    value-by="Sigla"
    outline
    searchable
    clearable
    track-by="Sigla"
  />
  <va-select style="margin: 0px;"
    label="Comune rilascio documento"
    :options="find_comune_rilascio_doc"
    v-model="createdItem.comune_rilascio_documento"
    text-by="Descrizione"
    value-by="Codice"
    outline
    :loading="false"
    searchable
    clearable
  />
  </div>
    </div>
  </div>
  <div class="row flex align--center" style="width: 100%; margin: 0px;">
    <va-button  icon="add" @click="addNewItem()"  > Aggiungi </va-button>
  </div>
  
   <va-switch v-model="file_preview" label="Mostra anteprima del file" left-label true-inner-label="Si" false-inner-label="No" size="small" class="mr-4" style="margin: 0px;" />
     <va-divider v-if="file_preview">
      <span class="px-2">File di testo</span>
  </va-divider>
    <va-input v-if="file_preview" style="margin: 10px;"
      id="myTextarea"
      class="mb-4"
      type="textarea"
      v-model="write_text"
      placeholder="Anteprima del file txt"
      readonly
    />

  <va-divider>
      <span class="px-2">Tabella</span>
  </va-divider>

  <va-data-table :items="items" :columns="columns" striped style="margin: 0px;">
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
    message="Modifica la riga"
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
   <div class="row flex">
    <va-button icon="download"  @click="save_txt()"  > Download </va-button>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { saveAs } from 'file-saver';
import sesso from "../data/sesso.csv";
import comuni from "../data/comuni.csv";
import stati from "../data/stati.csv";
import documenti from "../data/documenti.csv";
import tipo_alloggiato from "../data/tipo_alloggiato.csv";
import province from '../data/province-sigle.csv';

const defaultItem = {
  tipo_documento:"",
  numero_documento: "",
  luogo_rilascio_documento: "",
  comune_nascita: "",
  provincia_nascita: "",
  data_nascita: new Date(),
      date_permanenza: {
          start: new Date(),
          end: new Date()
      },
  stato_nascita: 100000100, // ITALIA
  cittadinanza: 100000100, // ITALIA
};

export default defineComponent({
  name: 'form-elements',
  data() {
    const items = [
    ];
    const columns = [
     // { key: "id", sortable: true, value: 1 },
      { key: "tipo_alloggiato", sortable: true},
      { key: "data_arrivo", sortable: true},
      { key: "giorni_permanenza", sortable: true},
      { key: "cognome", sortable: true},
      { key: "nome", sortable: true},
      { key: "sesso", sortable: true},
      { key: "data_nascita", sortable: true},
      { key: "comune_nascita", sortable: true},
      { key: "provincia_nascita", sortable: true},
      { key: "stato_nascita", sortable: true},
      { key: "cittadinanza", sortable: true},
      { key: "tipo_documento", sortable: true},
      { key: "numero_documento", sortable: true},
      { key: "luogo_rilascio_documento", sortable: true},
      { key: "actions", width: 80 },
    ];
    // const comuni = d3.csv('../data/comuni.csv')
    // const tipo_alloggiato =
    return {
      items,
      file_preview: true,
      columns,
      date_permanenza: {
          start: new Date(),
          end: new Date()
      },
      editedItemId: null,
      editedItem: null,
      createdItem: { ...defaultItem },
      tipo_alloggiato: tipo_alloggiato,
      data_nascita: this.data_nascita,
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
    find_comune_nascita() {
      let prov = this.createdItem.provincia_nascita
      console.log(this.temp)
      let t = this.comuni
      let tt = t.filter( function(el) {return el.Provincia==prov & el.DataFineVal===null}
      )    
      console.log(tt)
      return tt
    },
    find_comune_rilascio_doc() {
      let prov = this.createdItem.provincia_rilascio_documento
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
          console.log(parseInt(i))
        if (Boolean(item.tipo_alloggiato)=== true) {
          if (i>0) {
            plain_text+='\n'
          }
          plain_text+=
          item.tipo_alloggiato+
          item.data_arrivo+
          item.giorni_permanenza+
          item.cognome+
          item.nome+
          item.sesso+
          item.data_nascita+
          item.comune_nascita+
          item.provincia_nascita+
          item.stato_nascita+
          item.cittadinanza+
          item.tipo_documento+
          item.numero_documento+
          item.luogo_rilascio_documento
        } else {
          continue
        }
      }   
    console.log('plain: \t'+plain_text)     
    return plain_text!="" ? plain_text : ""
    },
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
    castToString(s) {
        try {
          return s
        } catch (error) {
          console.error(error);
          return ""
        }
    },
    addNewItem() {
      console.log(this.createdItem)

      this.createdItem.tipo_alloggiato = this.castToString(this.createdItem.tipo_alloggiato.toString().padEnd(2, ' '))
      this.createdItem.data_arrivo =  this.castToString(this.formatDate(this.date_permanenza.start))
      this.createdItem.giorni_permanenza =  this.castToString(parseInt((this.date_permanenza.end - this.date_permanenza.start)/(24*60*60*1e3)).toString().padStart(2, '0'))
      this.createdItem.cognome =  this.castToString(this.createdItem.cognome.toString().padEnd(50, ' '))
      this.createdItem.nome =  this.castToString(this.createdItem.nome.toString().padEnd(30, ' '))
      this.createdItem.data_nascita =  this.castToString(this.formatDate(this.createdItem.data_nascita))
      this.createdItem.comune_nascita =  this.castToString(this.createdItem.comune_nascita.toString().padEnd(9, ' '))
      this.createdItem.provincia_nascita =  this.castToString(this.createdItem.provincia_nascita.toString().padEnd(2, ' '))
      this.createdItem.stato_nascita =  this.castToString(this.createdItem.stato_nascita.toString().padEnd(9, ' '))
      this.createdItem.cittadinanza =  this.castToString(this.createdItem.cittadinanza.toString().padEnd(9, ' '))
      this.createdItem.tipo_documento =  this.castToString(this.createdItem.tipo_documento.toString().padEnd(5, ' '))
      this.createdItem.numero_documento =  this.castToString(this.createdItem.numero_documento.toString().padEnd(20, ' '))
      if (this.createdItem.stato_rilascio_documento === 100000100) { // italia
          this.createdItem.luogo_rilascio_documento =  this.castToString(this.createdItem.comune_rilascio_documento.toString().padEnd(9, ' '))
      } else {
        this.createdItem.luogo_rilascio_documento =  this.castToString(this.createdItem.stato_rilascio_documento.toString().padEnd(9, ' '))
      }
      
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
        console.log("Errore")
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
    set_readonly_tipo_alloggiato() {
        if (this.createdItem.tipo_alloggiato  === 19 || this.createdItem.tipo_alloggiato === 20) {
          return true
        } else {
          return false
        }
    },
    set_readonly_non_nato_italia() {
        if (this.createdItem.stato_nascita != 100000100) {
          return true
        } else {
          return false
        }
    },
    save_txt() {
      // const fs = require("fs")
      // const path = require("path")
      let filename = this.formatDate(new Date()).replace('/', '')
      var textFile = this.write_text,
      data = new Blob([textFile], { type: "text/plain" });

      saveAs(data, "Alloggiati"+filename+".txt")
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
  .row.row-inside {
    max-width: none;
  }

  .va-input-wrapper, fieldset {
    margin-bottom: 0.5rem;
  }
</style>
