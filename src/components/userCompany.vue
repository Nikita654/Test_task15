<template>
  <div class="company">
    <div class="company-bar">
      <ul class="company-breadcrumb">
        <li>Профиль</li>
      </ul>
    </div>
    <br />
    <div class="company-content">
      <div class="company-nav-container">
        <ul class="company-nav company-nav-pills">
          <li class="active">
            <a href="#">Компания</a>
          </li>
          <li>
            <a href="#">Информация о пользователе</a>
          </li>
          <li>
            <a href="#">Сменить пароль</a>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="portlet">
          <div class="content-title">
            <div class="content-text content-title-yellow">
              <span class="content-text-subject bold uppercase">Компания</span>
            </div>
          </div>
          <div class="content-body">
            <div class="form-body">
              <div class="form-group field-profile-inn" id="company-info-block">
                <span>ИНН / КПП</span>
                : {{inn}} / {{kpp}}
                <br />
                <span>Организация</span>
                : {{nameCompany}}
              </div>

              <div class="form-group field-companyprofile-count_cars required">
                <label
                  class="control-label"
                  for="companyprofile-count_cars"
                >Общее количество машин в собственности</label>
                <input
                  v-model="countTrucks"
                  type="text"
                  id="companyprofile-count_cars"
                  class="form-control"
                  name="CompanyProfile[count_cars]"
                  autocomplete="off"
                  placeholder="Общее количество машин в собственности"
                  aria-required="true"
                />

                <p class="company-help-block company-help-block-error"></p>
              </div>
              <div class="form-group field-companyprofile-post_address required">
                <label class="control-label" for="companyprofile-post_address">
                  Почтовый адрес
                  <span
                    class="popovers label-popovers"
                    title="Пожалуйста, заполните почтовый адрес, и документы по перевозкам будут доставлены максимально быстро."
                  >?</span>
                </label>
                <input
                  v-model="postAddress"
                  type="text"
                  id="companyprofile-post_address"
                  class="form-control"
                  name="CompanyProfile[post_address]"
                  value="Ленина д.3"
                  autocomplete="off"
                  placeholder="Почтовый адрес"
                  aria-required="true"
                />

                <p class="company-help-block company-help-block-error"></p>
              </div>
              <div class="form-group field-companyprofile-site">
                <label class="control-label" for="companyprofile-site">Сайт компании</label>
                <input
                  v-model="site"
                  type="text"
                  id="companyprofile-site"
                  class="form-control"
                  name="CompanyProfile[site]"
                  maxlength="255"
                  autocomplete="off"
                  placeholder="Сайт компании"
                />

                <p class="company-help-block company-help-block-error"></p>
              </div>
              <div class="form-group field-companyprofile-bik">
                <label class="control-label" for="companyprofile-bik">БИК</label>
                <input
                  v-model="codeBIK"
                  type="text"
                  id="companyprofile-bik"
                  class="form-control suggestions-input"
                  name="CompanyProfile[bik]"
                  value
                  maxlength="9"
                  data-type="bik"
                  autocomplete="off"
                  placeholder="БИК"
                  style="box-sizing: border-box;"
                  v-mask="'#########'"
                  @click="statusBankCh = true"
                />
                <div class="company-suggestions-container">
                  <div
                    @mouseleave="statusBankCh = false"
                    v-show="statusBankCh&&banksChooses.length>0"
                    class="company-suggestions"
                  >
                    <div
                      v-for="(bank, index) in banksChooses.slice(0,5)"
                      :key="`bankName-${index}`"
                      class="company-suggestions-item"
                      @click="bankChoose(bank)"
                    >
                      <span class="suggestions-value">{{bank.value}}</span>
                      <div class="company-suggestions-text">
                        <span
                          class="company-suggestions-text company-suggestions-text_inline"
                        >{{bank.data.bic}}</span>
                        {{bank.data.address.value}}
                      </div>
                    </div>
                  </div>
                </div>
                <p class="company-help-block company-help-block-error"></p>
              </div>
              <div class="form-group field-companyprofile-bank_title">
                <label class="control-label" for="companyprofile-bank_title">Наименование Банка</label>
                <input
                  type="text"
                  id="companyprofile-bank_title"
                  class="form-control"
                  name="CompanyProfile[bank_title]"
                  value
                  readonly
                  maxlength="255"
                  data-type="bank_title"
                  v-model="bankName"
                  autocomplete="off"
                  placeholder="Наименование Банка"
                />
                <p class="company-help-block company-help-block-error"></p>
              </div>
              <div class="form-group field-companyprofile-corr_schet">
                <label class="control-label" for="companyprofile-corr_schet">Корреспондентский счет</label>
                <input
                  type="text"
                  v-model="korCount"
                  id="companyprofile-corr_schet"
                  class="form-control"
                  name="CompanyProfile[corr_schet]"
                  value
                  readonly
                  maxlength="20"
                  data-type="corr_schet"
                  autocomplete="off"
                  placeholder="Корреспондентский счет"
                />
                <p class="company-help-block company-help-block-error"></p>
              </div>
              <div class="form-group field-companyprofile-schet">
                <label class="control-label" for="companyprofile-schet">Номер банковского счета</label>
                <input
                  v-model="bankAccount"
                  type="text"
                  id="companyprofile-schet"
                  class="form-control"
                  name="CompanyProfile[schet]"
                  value
                  maxlength="20"
                  data-type="schet"
                  autocomplete="off"
                  placeholder="Номер банковского счета"
                />
                <p class="company-help-block company-help-block-error"></p>
              </div>

              <div class="company-form-download-container">
                <div class="company-form-download">
                  <input
                    data-moderate
                    type="hidden"
                    name="files_[]"
                    value="15942445225f063daa8ab084.78439610.jpg"
                  />
                  <div class="form-group field-companyprofile-scan_edo">
                    <label
                      class="control-label"
                      for="companyprofile-scan_edo"
                    >Соглашение об электронном взаимодействии</label>
                    <input type="hidden" name="CompanyProfile[scan_edo][]" value />
                    <div class="file-input">
                      <div class="file-preview">
                        <div class="file-preview-thumbnails">
                          <div
                            class="file-preview-frame krajee-default file-preview-initial file-sortable kv-preview-thumb"
                            id="preview-1594724646325_60-init_0"
                          >
                            <div class="file-preview-content">Scan Edo #1</div>
                            <div class="file-preview-footer pull-right">
                              <button type="button" class="save-file btn btn-xs btn-default">
                                <i class="glyphicon glyphicon-save text-success"></i>
                              </button>
                              <a
                                :href="contractsDown"
                                class="kv-file-download btn btn-xs btn-default"
                              >
                                <i class="glyphicon glyphicon-search text-success"></i>
                              </a>
                              <button
                                type="button"
                                class="kv-file-remove btn btn-sm btn-kv btn-default btn-outline-secondary"
                                title="Remove file"
                              >
                                <i class="glyphicon glyphicon-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="clearfix"></div>
                        <div class="file-preview-status text-center text-success"></div>
                        <div class="kv-fileinput-error file-error-message" style="display: none;"></div>
                      </div>

                      <div class="kv-upload-progress company-hidden"></div>
                      <div class="clearfix"></div>

                      <button
                        type="button"
                        title="Abort ongoing upload"
                        class="btn btn-default btn-secondary company-hidden fileinput-cancel fileinput-cancel-button"
                      >
                        <i class="glyphicon glyphicon-ban-circle"></i>
                        <span class="hidden-xs">Cancel</span>
                      </button>
                      <a
                        title="Загрузить и сохранить"
                        class="btn btn-default btn-secondary fileinput-upload company-upload-button"
                      >
                        <i class="glyphicon glyphicon-upload"></i>
                        <span class="hidden-xs">Загрузить и сохранить</span>
                      </a>
                      <div class="btn btn-brand btn-file">
                        <i class="glyphicon glyphicon-folder-open"></i>&nbsp;
                        <input
                          type="file"
                          id="companyprofile-scan_edo"
                          class="input_field_file_on_event"
                          name="CompanyProfile[scan_edo][]"
                          multiple
                        />
                      </div>
                    </div>

                    <p class="company-help-block company-help-block-error"></p>
                  </div>
                </div>
                <div class="content-help-symbol">
                  <span
                    class="popovers label-popovers"
                    title="Распечатайте указанный документ из приветственного письма или профиля, подпишите у уполномоченного лица вашей компании (лица, имеющего права действовать без доверенности от имени компании, либо лица, наделенного полномочиями по взаимодействию с GroozGo). Прикрепите документ в профиль или отправьте в ответе на приветственное письмо, направленное после регистрации. После этого ваша компания сможет совершать юридически значимые действия на сервисе GroozGo – заключать договоры, размещать и/или принимать к исполнению заказы на перевозку"
                  >?</span>
                </div>

                <div class="company-form-download">
                  <div class="form-group" style>
                    <a :href="contractLink" class="btn btn-brand-outline">Скачать шаблон</a>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">
                  Получен оригинал соглашения об электронном взаимодействии&nbsp;
                  <span
                    class="popovers label-popovers"
                    title="Если оригинал не получен - значение “Нет”"
                  >?</span>
                </label>
                <div class="col-md-12">
                  <p class="form-control-static">{{(statusOriginal==1)?'Да':'Нет'}}</p>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">
                  Срок действия соглашения об электронном взаимодействии&nbsp;
                  <span
                    class="popovers label-popovers"
                    title="Срок устанавливается при проверке скан-копии или оригинала Соглашения об электронном взаимодействии. До получения оригинала срок – 30 дней с даты проверки скан-копии"
                  >?</span>
                </label>
                <div class="col-md-12">
                  <p class="form-control-static">{{(date!='')?date:'Нет'}}</p>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">
                  Статус подписания документов ЭДО&nbsp;
                  <span
                    class="popovers label-popovers"
                    title="Если вы отказались от подписания договоров и соглашений и/или не предоставили соглашение об электронном взаимодействии - значение “Не подписаны”"
                  >?</span>
                </label>
                <div class="col-md-12">
                  <p class="form-control-static">{{(statusDraw==1)?'Подписаны':'Не подписаны'}}</p>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <button type="submit" class="btn btn-brand btn-save">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { mapState } from "vuex";
export default {
  directives: { mask },
  name: "formLogin",
  data() {
    return {
      codeBIK: "",
      codeChoose: "",
      bankName: "",
      korCount: "",
      site: "",
      countTrucks: "",
      bankAccount: "",
      contractLink: "",
      postAddress: "",
      nameCompany: "",
      inn: "",
      kpp: "",
      date: "",
      statusOriginal: 0,
      statusDraw: 0,
      contractsDown: "",
      statusBankCh: false,
      banksChooses: []
    };
  },

  methods: {
    bankChoose(bank) {
      this.codeBIK = bank.data.bic;
      this.korCount = bank.data.correspondent_account;
      this.bankName = bank.value;
      this.statusBankCh = false;
    }
  },
  computed: {
    ...mapState(["userToken"])
  },
  watch: {
    codeBIK(val) {
      let url =
        "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank";
      let token = "5d7f541af5b3cc8e369890f92a07574ecc68861a";
      let query = val;
      let options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Token " + token
        },
        body: JSON.stringify({ query: query })
      };
      fetch(url, options)
        .then(response => response.text())
        .then(result => (this.banksChooses = JSON.parse(result).suggestions))
        .catch();
    }
  },
  mounted() {
    let url = "https://dev.cargo.direct/api/company-profile";
    let options = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + this.userToken
      }
    };
    fetch(url, options)
      .then(response => response.text())
      .then(result => {
        let data = JSON.parse(result).data;
        console.log(data);
        this.codeBIK = data.bik != null ? data.bik : "";
        this.bankName = data.bank_title != null ? data.bank_title : "";
        this.korCount = data.corr_account != null ? data.corr_account : "";
        this.site = data.site != null ? data.site : "";
        this.bankAccount = data.bank_account != null ? data.bank_account : "";
        this.countTrucks = data.count_trucks != null ? data.count_trucks : "";
        this.contractLink =
          data.edo_contract_link != null ? data.edo_contract_link : "";
        this.postAddress = data.post_address != null ? data.post_address : "";
        this.nameCompany = data.organization != null ? data.organization : "";
        this.inn = data.inn != null ? data.inn : "";
        this.kpp = data.kpp != null ? data.kpp : "";
        this.date = data.edo_date != null ? data.edo_date : "";
        this.statusOriginal =
          data.edo_original != null ? data.edo_original : "";
        this.contractsDown =
          data.edo_contracts.length != 0 ? data.edo_contracts[0] : "";
        //Поле которое осталось под вопросом из документации
        this.statusDraw = data.edo_original != null ? data.edo_original : "";
        //edo_scan_checked
        //scan_edo
      });
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/scss/mainVar.scss";
.company {
  margin-top: 50px;
  margin-bottom: 33px;
  margin-left: 235px;
  padding: 25px 20px 10px 20px;
  background-color: $default-color;
  min-height: calc(100vh - 50px);
  font-family: "Ubuntu", arial, sans-serif;
  @media (max-width: 767px) {
    overflow: hidden;
    padding: 20px 10px 10px 10px;
  }
  @media (max-width: 1025px) {
    margin-top: 56px;
    margin-left: 0;
    padding: 20px 20px 20px 20px;
  }
  .control-label {
    position: relative;
  }
  .label-popovers {
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 10px;
    background-color: $bright-color;
    color: $darkless-color;
    padding: 0 3px;
    border-radius: 50%;
    margin-left: 3px;
    text-align: center;
  }
  .company-bar {
    border-bottom: 1px solid $light-color;
    background-color: $default-color;
    position: relative;
    padding: 0px 20px;
    margin: -25px -20px 0 -20px;
    border-radius: 4px;
    @media (max-width: 1025px) {
      background: $lightless-color;
      margin-top: -20px;
      text-align: center;
    }
  }
  .company-suggestions-container {
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    .company-suggestions {
      background: $default-color;
      border: 1px solid $lightest-color;
      box-sizing: border-box;
      cursor: default;
      z-index: 9999;
      position: absolute;
      left: 0;
      top: 0px;
      width: 100%;
    }

    .company-suggestions-item {
      padding: 4px 4px;
      overflow: hidden;
      cursor: pointer;
    }
    .company-suggestions-item:hover {
      background: $lightestCCC-color;
    }
    .company-suggestions-text {
      color: $darkless777-color;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .company-suggestions-text_inline {
      display: inline-block;
      min-width: 6em;
      vertical-align: bottom;
      margin: 0 0.5em 0 0;
    }
    .company-suggestions-hint {
      padding: 4px 4px;
      white-space: nowrap;
      overflow: hidden;
      color: $darkless777-color;
      font-size: 85%;
    }
  }

  .company-help-block {
    margin-top: 0px;
    margin-bottom: 5px;
  }

  .company-breadcrumb {
    padding: 11px 0;
    display: inline-block;
    margin: 0;
    list-style: none;
    li {
      display: inline-block;
      @media (max-width: 1025px) {
        color: $darkless-color;
        font-weight: 500;
      }
    }
  }
  .company-hidden,
  .company-upload-button {
    display: none;
  }
  .company-content {
    margin-right: -15px;
    margin-left: -15px;
  }
  .company-form-download {
    display: table-cell;
    float: none;
    vertical-align: bottom;
    &-container {
      display: table;
    }
    @media (max-width: 400px) {
      display: block;
    }
  }
  .company-nav {
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    display: flex;
    align-items: center;
    @media (max-width: 550px) {
      display: block;
    }
    li + li {
      @media (max-width: 550px) {
        margin-left: 0px;
        margin-top: 5px;
      }
    }
    li {
      position: relative;
      display: block;
      a {
        position: relative;
        display: block;
        padding: 10px 15px;
        border-radius: 10px;
        color: $darkless-color;
        font-size: 14px;
        &:hover {
          text-decoration: none;
          background-color: $lightestEEE-color;
        }
      }
      &.active a,
      &.active a:hover,
      &.active a:focus {
        cursor: initial;
        color: $darkless-color;
        background-color: $bright-color;
      }
    }
    &-pills {
      margin-bottom: 10px;
    }
    &-container {
      position: relative;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
    }
  }
  .content {
    width: 50%;
    @media (max-width: 767px) {
      width: 100%;
      min-width: 100%;
    }
    @media (max-width: 991px) {
      width: 83.33333333%;
    }
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
    margin: 0 auto;
    &-help-symbol {
      display: table-cell;
      vertical-align: top;
      position: relative;
      @media (max-width: 400px) {
        display: none;
      }
    }
    &-title {
      border-bottom: 1px solid $lightestEEE-color;
      padding: 0;
      margin-bottom: 10px;
      min-height: 41px;
      border-radius: 4px 4px 0 0;

      .content-title-yellow {
        min-width: 100%;
        text-align: center;
        color: $bright-color;
      }
      .content-text {
        display: inline-block;
        font-size: 18px;
        line-height: 18px;
        padding: 10px 0;
        @media (max-width: 1025px) {
          text-align: left;
          font-size: 21px;
        }
      }
    }

    &-body {
      border-radius: 0 0 4px 4px;
      clear: both;
    }
  }
  .file-input {
    position: relative;
  }
  .file-preview {
    border-radius: 0px;
    border: none;
    padding: 0px;
    width: 100%;
    margin-bottom: 3px;
    margin-left: -6px;
    &-footer {
      height: 25px;
      text-align: right;
      .btn {
        width: 25px;
        height: 25px;
      }
      i {
        display: inline-block;
        line-height: 14px;
        -webkit-font-smoothing: antialiased;
      }
    }
    &-frame {
      width: 240px;
      text-align: left;
      margin: 2px;
      margin-left: 6px;
      background-color: $lightestEEE-color;
      border: 1px solid $dark02-color;
      padding: 6px;
      border-radius: 4px;
      &-content {
        height: 20px;
        width: 160px;
        display: inline-block;
      }
      .btn-file input[type="file"] {
        top: 0;
        left: 0;
        min-width: 100%;
        min-height: 100%;
        text-align: right;
        opacity: 0;
        background: none repeat scroll 0 0 transparent;
        cursor: inherit;
        display: block;
      }
    }
  }
}
</style>