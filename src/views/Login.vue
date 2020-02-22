<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home wallet</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"

        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >Field 'Email' must not be empty</small>
        <small class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
        >Please fill in the correct email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Password</label>
        <small class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
        >Password must not be empty</small>
        <small class="helper-text invalid"
        v-else-if="$v.password.$dirty && !$v.password.minLength"
        >Password must be {{ $v.password.$params.minLength.min }} signs. Now it's {{ password.length }} signs.</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Log in
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        No account?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),

  validations: {
    email: {email, required},
    password: {required, minLength: minLength(5)},
  },

  mounted() {
    if(messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }

  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }
      try {
        await this.$store.dispatch('login', formData)
        // Redirect to main page
        this.$router.push('/');
      } catch (e) {}

    },
  },
};
</script>
