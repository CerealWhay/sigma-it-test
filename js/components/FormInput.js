
const template = `
<div class="contact-form__input-wrapper" :class="errorClass">
    <label class="contact-form__error-label"
           :for="id"
    >
        {{errorMessage}}
    </label>
    <input class="contact-form__input"
           required
           
           :type="type"
           :name="id"
           :id="id"
           :placeholder='inputPlaceholder'
           
           v-model="inputData"
           @input="validateInput"
           @change="$emit('get-input-text', inputData, id, isError)"
    >
</div>
`

export let FormInput = {
    template: template,

    props: ['id', 'input-placeholder', 'type'],
    data() {
        return {
            errorMessage: 'Некорректно заполнено поле',
            isError: false,
            inputData: '',
        }
    },
    computed: {
        errorClass() {
            if (this.isError) {
                return 'contact-form__input-wrapper_error'
            } else {
                return ''
            }
        },
    },
    methods: {
        validateInput() {
            switch (this.id) {
                case 'phone':
                    this.validatePhone()
                    break;
                case 'email':
                    this.validateEmail()
                    break;
                case 'age':
                    this.validateAge();
                    break;
                default:
                    break;
            }
        },
        getPrefixNumber(str) {
            if (str === "7") {
                return "7 (";
            }
            if (str === "8") {
                return "8 (";
            }
            if (str === "9") {
                return "7 (9";
            }
            return "7 (";
        },
        validatePhone() {
            const value = this.inputData.replace(/\D+/g, "");
            const numberLength = 11;

            let result;
            if (this.inputData.includes("+8") || this.inputData[0] === "8") {
                result = "";
            } else {
                result = "+";
            }

            for (let i = 0; i < value.length && i < numberLength; i++) {
                switch (i) {
                    case 0:
                        result += this.getPrefixNumber(value[i]);
                        continue;
                    case 4:
                        result += ") ";
                        break;
                    case 7:
                        result += "-";
                        break;
                    case 9:
                        result += "-";
                        break;
                    default:
                        break;
                }
                result += value[i];
            }
            this.inputData = result;

            this.isError = !(
                value.length >= 11
                || this.inputData === ''
            );
        },
        validateEmail() {
            this.isError = !(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.inputData)
                || this.inputData === ''
            );
        },
        validateAge() {
            this.isError = !(
                (
                    Number.isInteger(parseInt(this.inputData))
                    && parseInt(this.inputData) <= 100
                    && parseInt(this.inputData) > 0
                )
                || this.inputData === ''
            );
        },
    }


}