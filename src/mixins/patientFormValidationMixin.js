export default {
  data() {
    return {
      errors: {
        nameInvalid: false,
        addressInvalid: false,
        phoneNumberInvalid: false,
        lastVisitInvalid: false,
        numberOfSessionsInvalid: false,
      },
    };
  },
  methods: {
    checkPatientFormValidation() {
      if (!this.errors.nameInvalid && !this.errors.addressInvalid && !this.errors.phoneNumberInvalid && !this.errors.lastVisitInvalid && !this.errors.numberOfSessionsInvalid) {
        return true;
      }
      return false;
    },
    showValidationErrors() {
      const validateLastVisited = /[0-9]{2}\/[0-9]{2}\/[0-9]{2}/g;

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

      if (!validateLastVisited.test(this.patient.lastVisit)) {
        this.errors.lastVisitInvalid = true;
      } else {
        this.errors.lastVisitInvalid = false;
      }

      if (this.patient.numberOfSessions <= 0) {
        this.errors.numberOfSessionsInvalid = true;
      } else {
        this.errors.numberOfSessionsInvalid = false;
      }
    },
  },
};
