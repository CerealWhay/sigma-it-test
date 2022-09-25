import {FormInput} from './FormInput.js'

const template = `
<form id="contact-form" class="contacts__form contact-form" @submit.prevent="sendForm">
    <div class="contact-form__wrapper">        
        <form-input v-for="formInput in formInputs" 
                    :key="formInput.id" 
                    
                    :id="formInput.id" 
                    :input-placeholder="formInput.placeholder" 
                    :type="formInput.type"
                    
                    @get-input-text="fillFormData"
                    
        ></form-input>
    </div>
    <input type="submit" 
           class="contact-form__button button" 
           value="Отправить"
    >
</form>
`

export let ContactForm = {
    components: {'form-input': FormInput,},
    data() {
        return {
            formInputs: [
                {id: 'name', placeholder: 'Ваше имя*', type: 'text', isError: false},
                {id: 'phone', placeholder: 'Телефон*', type: 'tel', isError: false},
                {id: 'email', placeholder: 'E-mail*', type: 'email', isError: false},
                {id: 'age', placeholder: 'Возраст*', type: 'text', isError: false},
            ],
            formData: {
                name: '',
                phone: '',
                email: '',
                age: '',
            },
        }
    },
    methods: {
        fillFormData(inputData, id, isError) {
            this.formData[id] = inputData

            this.formInputs.map((el) => {
                if (el.id === id ) {
                    el.isError = !!isError;
                }
            })
        },
        sendForm() {
            if (this.validateForm) {
                alert( JSON.stringify(this.formData) );
            } else {
                alert( 'error' );
            }
        }
    },
    computed: {
        validateForm() {
            let isOk = true;
            this.formInputs.map((el) => {
                if (el.isError) {
                    isOk = false;
                }
            })
            return isOk;
        }
    },
    template: template

}