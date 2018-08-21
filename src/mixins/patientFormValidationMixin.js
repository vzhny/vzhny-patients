export default {
  data() {
    return {
      errors: {
        nameInvalid: false,
        addressInvalid: false,
        phoneNumberInvalid: false,
      },
    };
  },
  methods: {
    checkPatientFormValidation() {
      if (!this.errors.nameInvalid && !this.errors.addressInvalid && !this.errors.phoneNumberInvalid) {
        return true;
      }
      return false;
    },
    showValidationErrors() {
      if (!this.patient.name.length) {
        this.errors.nameInvalid = true;
      } else {
        this.errors.nameInvalid = false;
      }

      if (!this.patient.address.length) {
        this.errors.addressInvalid = true;
      } else {
        this.errors.addressInvalid = false;
      }

      if (!this.patient.phoneNumber.length) {
        this.errors.phoneNumberInvalid = true;
      } else {
        this.errors.phoneNumberInvalid = false;
      }
    },
  },
};
