// add leading zero to integers
const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) {
    num = "0" + num;
  }
  return num;
};

const get_intermediate_string = (encoded_data) => {
  let binary_value, decimal_value, intermediate_str;
  let binary_value_arr = [];
  for (let i = 0; i < encoded_data.length; i++) {
    let chr = encoded_data.charAt(i);

    if (chr === "?") {
      binary_value = "111111";
    } else {
      decimal_value = chr.charCodeAt(0);
      binary_value = pad((decimal_value - 64).toString(2), 6);
    }

    binary_value_arr.push(binary_value);
  }
  intermediate_str = binary_value_arr.join("");
  return intermediate_str;
};

const decode_pseudobinary = (encoded_data) => {
  let intermediate_str = get_intermediate_string(encoded_data);
  return Number.parseInt(intermediate_str, 2);
};

const decode_signed_pseudobinary = (encoded_data) => {
  let intermediate_str = get_intermediate_string(encoded_data);
  let decoded_value = Number.parseInt(intermediate_str, 2);
  decoded_value =
    decoded_value > 131071 ? 131072 - decoded_value : decoded_value;
  return decoded_value;
};

const decode_pseudobinary_b = (encoded_data) => {
  let intermediate_str = get_intermediate_string(encoded_data);
  if (intermediate_str.startsWith("1")) {
    let intermediate_number = Number.parseInt(intermediate_str, 2) - 1;
    let intermediate_negative_str = intermediate_number.toString(2);
    let flipped_str = intermediate_negative_str
      .split("")
      .map((char) => (char === "1" ? "0" : "1"))
      .join("");
    return -1 * Number.parseInt(flipped_str, 2);
  } else {
    return Number.parseInt(intermediate_str, 2);
  }
};

export {
  decode_signed_pseudobinary,
  decode_pseudobinary_b,
  decode_pseudobinary,
};
