
export default function setFormattedPhoneNumber(phoneNumber) {
    const formattedPhoneNumber = Number(phoneNumber.replace(/[^0-9.-]+/g,""));
    return formattedPhoneNumber;
}



// I need to figure out what all of the right function are for this.