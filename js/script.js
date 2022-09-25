import {ContactForm} from './components/ContactForm.js';

const AttributeBinding = {
    components: {'contact-form': ContactForm}
}

Vue.createApp(AttributeBinding).mount('#app')
