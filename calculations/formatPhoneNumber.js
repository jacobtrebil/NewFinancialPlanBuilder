
export default function setFormattedPhoneNumber(phoneNumber) {
    const numbersOnlyPhoneNumber = Number(phoneNumber.replace(/\D/g,""));
    const formattedPhoneNumber = `1${numbersOnlyPhoneNumber}`;
    return formattedPhoneNumber;
}



// I need to figure out what all of the right function are for this.
// It should always start with a 1 as well. 