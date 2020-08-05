const countries = [
    { "label": "Afghanistan", "value": "AF" },
    { "label": "Ägypten", "value": "EG" },
    { "label": "Åland", "value": "AX" },
    { "label": "Albanien", "value": "AL" },
    { "label": "Algerien", "value": "DZ" },
    { "label": "Amerikanisch-Samoa", "value": "AS" },
    { "label": "Amerikanische Jungferninseln", "value": "VI" },
    { "label": "Andorra", "value": "AD" },
    { "label": "Angola", "value": "AO" },
    { "label": "Anguilla", "value": "AI" },
    { "label": "Antigua und Barbuda", "value": "AG" },
    { "label": "Äquatorialguinea", "value": "GQ" },
    { "label": "Argentinien", "value": "AR" },
    { "label": "Armenien", "value": "AM" },
    { "label": "Niederlande - Aruba", "value": "AW" },
    { "label": "Ascension", "value": "AC" },
    { "label": "Aserbaidschan", "value": "AZ" },
    { "label": "Äthiopien", "value": "ET" },
    { "label": "Australien", "value": "AU" },
    { "label": "Bahamas", "value": "BS" },
    { "label": "Bahrain", "value": "BH" },
    { "label": "Bangladesch", "value": "BD" },
    { "label": "Barbados", "value": "BB" },
    { "label": "Weißrussland", "value": "BY" },
    { "label": "Belgien", "value": "BE" },
    { "label": "Belize", "value": "BZ" },
    { "label": "Benin", "value": "BJ" },
    { "label": "Bermuda", "value": "BM" },
    { "label": "Bhutan", "value": "BT" },
    { "label": "Bolivien", "value": "BO" },
    { "label": "Bosnien und Herzegowina", "value": "BA" },
    { "label": "Botswana", "value": "BW" },
    { "label": "Brasilien", "value": "BR" },
    { "label": "Britische Jungferninseln", "value": "VG" },
    { "label": "Britisches Territorium im Indischen Ozean", "value": "IO" },
    { "label": "Brunei Darussalam", "value": "BN" },
    { "label": "Bulgarien", "value": "BG" },
    { "label": "Burkina Faso", "value": "BF" },
    { "label": "Burundi", "value": "BI" },
    { "label": "Chile", "value": "CL" },
    { "label": "China, Volksrepublik", "value": "CN" },
    { "label": "Cookinseln", "value": "CK" },
    { "label": "Costa Rica", "value": "CR" },
    { "label": "Côte d'Ivoire", "value": "CI" },
    { "label": "Dänemark", "value": "DK" },
    { "label": "Deutschland", "value": "DE" },
    { "label": "Dominica", "value": "DM" },
    { "label": "Dominikanische Republik", "value": "DO" },
    { "label": "Dschibuti", "value": "DJ" },
    { "label": "Ecuador", "value": "EC" },
    { "label": "El Salvador", "value": "SV" },
    { "label": "Eritrea", "value": "ER" },
    { "label": "Estland", "value": "EE" },
    { "label": "Falklandinseln", "value": "FK" },
    { "label": "Dänemark - Färöer", "value": "FO" },
    { "label": "Fidschi", "value": "FJ" },
    { "label": "Finnland", "value": "FI" },
    { "label": "Frankreich", "value": "FR" },
    { "label": "Französisch-Guayana", "value": "GF" },
    { "label": "Französisch-Polynesien", "value": "PF" },
    { "label": "Gabun", "value": "GA" },
    { "label": "Gambia", "value": "GM" },
    { "label": "Georgien", "value": "GE" },
    { "label": "Ghana", "value": "GH" },
    { "label": "Gibraltar", "value": "GI" },
    { "label": "Grenada", "value": "GD" },
    { "label": "Griechenland", "value": "EL" },
    { "label": "Dänemark - Grönland", "value": "GL" },
    { "label": "Frankreich - Guadeloupe", "value": "GP" },
    { "label": "Guam", "value": "GU" },
    { "label": "Guatemala", "value": "GT" },
    { "label": "Vereinigtes Königreich - Kanalinseln Jersey und Guernsey", "value": "GG" },
    { "label": "Guinea", "value": "GN" },
    { "label": "Guinea-Bissau", "value": "GW" },
    { "label": "Frankreich - Guyana", "value": "GY" },
    { "label": "Haiti", "value": "HT" },
    { "label": "Heard- und McDonald-Inseln", "value": "HM" },
    { "label": "Honduras", "value": "HN" },
    { "label": "Hongkong", "value": "HK" },
    { "label": "Indien", "value": "IN" },
    { "label": "Indonesien", "value": "ID" },
    { "label": "Insel Man", "value": "IM" },
    { "label": "Irak", "value": "IQ" },
    { "label": "Iran, Islamische Republik", "value": "IR" },
    { "label": "Irland", "value": "IE" },
    { "label": "Island", "value": "IS" },
    { "label": "Israel", "value": "IL" },
    { "label": "Italien", "value": "IT" },
    { "label": "Jamaika", "value": "JM" },
    { "label": "Japan", "value": "JP" },
    { "label": "Jemen", "value": "YE" },
    { "label": "Jordanien", "value": "JO" },
    { "label": "Jugoslawien", "value": "YU" },
    { "label": "Kaimaninseln", "value": "KY" },
    { "label": "Kambodscha", "value": "KH" },
    { "label": "Kamerun", "value": "CM" },
    { "label": "Kanada", "value": "CA" },
    { "label": "Spanien - Kanarische Inseln", "value": "IC" },
    { "label": "Kap Verde", "value": "CV" },
    { "label": "Kasachstan", "value": "KZ" },
    { "label": "Katar", "value": "QA" },
    { "label": "Kenia", "value": "KE" },
    { "label": "Kirgisistan", "value": "KG" },
    { "label": "Kiribati", "value": "KI" },
    { "label": "Kokosinseln", "value": "CC" },
    { "label": "Kolumbien", "value": "CO" },
    { "label": "Komoren", "value": "KM" },
    { "label": "Kongo, Demokratische Republik", "value": "CD" },
    { "label": "Republik Kongo", "value": "CG" },
    { "label": "Korea, Demokratische Volksrepublik", "value": "KP" },
    { "label": "Korea, Republik", "value": "KR" },
    { "label": "Kroatien", "value": "HR" },
    { "label": "Kuba", "value": "CU" },
    { "label": "Kuwait", "value": "KW" },
    { "label": "Laos, Demokratische Volksrepublik", "value": "LA" },
    { "label": "Lesotho", "value": "LS" },
    { "label": "Lettland", "value": "LV" },
    { "label": "Libanon", "value": "LB" },
    { "label": "Liberia", "value": "LR" },
    { "label": "Libyen", "value": "LY" },
    { "label": "Liechtenstein", "value": "LI" },
    { "label": "Litauen", "value": "LT" },
    { "label": "Luxemburg", "value": "LU" },
    { "label": "Macao", "value": "MO" },
    { "label": "Madagaskar", "value": "MG" },
    { "label": "Malawi", "value": "MW" },
    { "label": "Malaysia", "value": "MY" },
    { "label": "Malediven", "value": "MV" },
    { "label": "Mali", "value": "ML" },
    { "label": "Malta", "value": "MT" },
    { "label": "Marokko", "value": "MA" },
    { "label": "Marshallinseln", "value": "MH" },
    { "label": "Frankreich - Martinique", "value": "MQ" },
    { "label": "Mauretanien", "value": "MR" },
    { "label": "Mauritius", "value": "MU" },
    { "label": "Mayotte", "value": "YT" },
    { "label": "Mazedonien", "value": "MK" },
    { "label": "Mexiko", "value": "MX" },
    { "label": "Mikronesien", "value": "FM" },
    { "label": "Moldawien", "value": "MD" },
    { "label": "Monaco", "value": "MC" },
    { "label": "Mongolei", "value": "MN" },
    { "label": "Montenegro", "value": "ME" },
    { "label": "Montserrat", "value": "MS" },
    { "label": "Mosambik", "value": "MZ" },
    { "label": "Myanmar", "value": "MM" },
    { "label": "Namibia", "value": "NA" },
    { "label": "Nauru", "value": "NR" },
    { "label": "Nepal", "value": "NP" },
    { "label": "Neukaledonien", "value": "NC" },
    { "label": "Neuseeland", "value": "NZ" },
    { "label": "Nicaragua", "value": "NI" },
    { "label": "Niederlande", "value": "NL" },
    { "label": "Niederlande - Niederländische Antillen", "value": "AN" },
    { "label": "Niger", "value": "NE" },
    { "label": "Nigeria", "value": "NG" },
    { "label": "Niue", "value": "NU" },
    { "label": "Nördliche Marianen", "value": "MP" },
    { "label": "Norfolkinsel", "value": "NF" },
    { "label": "Norwegen", "value": "NO" },
    { "label": "Oman", "value": "OM" },
    { "label": "Österreich", "value": "AT" },
    { "label": "Osttimor", "value": "TL" },
    { "label": "Pakistan", "value": "PK" },
    { "label": "Palästinensische Autonomiegebiete", "value": "PS" },
    { "label": "Palau", "value": "PW" },
    { "label": "Panama", "value": "PA" },
    { "label": "Papua-Neuguinea", "value": "PG" },
    { "label": "Paraguay", "value": "PY" },
    { "label": "Peru", "value": "PE" },
    { "label": "Philippinen", "value": "PH" },
    { "label": "Pitcairninseln", "value": "PN" },
    { "label": "Polen", "value": "PL" },
    { "label": "Portugal", "value": "PT" },
    { "label": "Puerto Rico", "value": "PR" },
    { "label": "Frankreich - Réunion", "value": "RE" },
    { "label": "Ruanda", "value": "RW" },
    { "label": "Rumänien", "value": "RO" },
    { "label": "Russische Föderation", "value": "RU" },
    { "label": "Salomonen", "value": "SB" },
    { "label": "Sambia", "value": "ZM" },
    { "label": "Samoa", "value": "WS" },
    { "label": "Italien - San Marino", "value": "SM" },
    { "label": "São Tomé und Príncipe", "value": "ST" },
    { "label": "Saudi-Arabien", "value": "SA" },
    { "label": "Schweden", "value": "SE" },
    { "label": "Schweiz", "value": "CH" },
    { "label": "Senegal", "value": "SN" },
    { "label": "Serbien", "value": "RS" },
    { "label": "Serbien und Montenegro", "value": "CS" },
    { "label": "Seychellen", "value": "SC" },
    { "label": "Sierra Leone", "value": "SL" },
    { "label": "Simbabwe", "value": "ZW" },
    { "label": "Singapur", "value": "SG" },
    { "label": "Slowakei", "value": "SK" },
    { "label": "Slowenien", "value": "SI" },
    { "label": "Somalia", "value": "SO" },
    { "label": "Spanien", "value": "ES" },
    { "label": "Sri Lanka", "value": "LK" },
    { "label": "St. Helena", "value": "SH" },
    { "label": "St. Kitts und Nevis", "value": "KN" },
    { "label": "St. Lucia", "value": "LC" },
    { "label": "St. Pierre und Miquelon", "value": "PM" },
    { "label": "St. Vincent und die Grenadinen", "value": "VC" },
    { "label": "Südafrika", "value": "ZA" },
    { "label": "Sudan", "value": "SD" },
    { "label": "Südgeorgien und die Südlichen Sandwichinseln", "value": "GS" },
    { "label": "Suriname", "value": "SR" },
    { "label": "Svalbard und Jan Mayen", "value": "SJ" },
    { "label": "Swasiland", "value": "SZ" },
    { "label": "Syrien, Arabische Republik", "value": "SY" },
    { "label": "Tadschikistan", "value": "TJ" },
    { "label": "Taiwan", "value": "TW" },
    { "label": "Tansania, Vereinigte Republik", "value": "TZ" },
    { "label": "Thailand", "value": "TH" },
    { "label": "Togo", "value": "TG" },
    { "label": "Tokelau", "value": "TK" },
    { "label": "Tonga", "value": "TO" },
    { "label": "Trinidad und Tobago", "value": "TT" },
    { "label": "Tristan da Cunha", "value": "TA" },
    { "label": "Tschad", "value": "TD" },
    { "label": "Tschechische Republik", "value": "CZ" },
    { "label": "Tunesien", "value": "TN" },
    { "label": "Türkei", "value": "TR" },
    { "label": "Turkmenistan", "value": "TM" },
    { "label": "Turks- und Caicosinseln", "value": "TC" },
    { "label": "Tuvalu", "value": "TV" },
    { "label": "Uganda", "value": "UG" },
    { "label": "Ukraine", "value": "UA" },
    { "label": "Ungarn", "value": "HU" },
    { "label": "Uruguay", "value": "UY" },
    { "label": "Usbekistan", "value": "UZ" },
    { "label": "Vanuatu", "value": "VU" },
    { "label": "Vatikanstadt", "value": "VA" },
    { "label": "Venezuela", "value": "VE" },
    { "label": "Vereinigte Arabische Emirate", "value": "AE" },
    { "label": "Vereinigte Staaten von Amerika", "value": "US" },
    { "label": "Vereinigtes Königreich von Großbritannien und Nordirland", "value": "GB" },
    { "label": "Vietnam", "value": "VN" },
    { "label": "Wallis und Futuna", "value": "WF" },
    { "label": "Weihnachtsinsel", "value": "CX" },
    { "label": "Westsahara", "value": "EH" },
    { "label": "Demokratische Republik Kongo", "value": "ZR" },
    { "label": "Zentralafrikanische Republik", "value": "CF" },
    { "label": "Zypern", "value": "CY" },
    { "label": "Großbritannien (Vereinigtes Königreich von Großbritannien und Nordirland)", "value": "GB" },
    { "label": "Kosovo", "value": "XK"}
]

export function getCountryLabel(value = null) {
  if (value === null)
    return 'n/a'

  const country = countries.find( item => item.value.toLowerCase() === value.toLowerCase() )

  if (country === void 0)
    return `n/a (${value})`

  return country.label
}

export default countries