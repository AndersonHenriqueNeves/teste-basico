export const cleanMask = value => {
    return value
    .replace(/([^0-9a-zA-Z])/g, '') //Substitui qualquer caracter que não seja numero ou letra por nada
}

export const phoneMask = value => {
    return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d)(\d{4})$/,"$1-$2")  //Coloca hífen entre o quarto e o quinto dígito
}

export const cpfMask = value => {
    return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada    
}

export const cnpjMask = value => {
    return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1.$2')// captura 2 grupos de numero o primeiro de 2 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona uma barra antes do segundo grupo de numero
    .replace(/(\d{4})(\d)/, '$1-$2') // captura 2 grupos de numero o primeiro de 4 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um - antes do segundo grupo de numero
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const pointMask = value => {
    return value
    .replace(/,/g, '.')
}

export const cepMask = value => {
    return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})(\d)/, '$1-$2')// captura 2 grupos, primeiro grupo com 5 digito e segundo com 3, colocando '-' entre os grupos 
    .replace(/(-\d{3})\d+?$/, '$1') // captura 3 numeros seguidos de um traço e não deixa ser digitado mais nada
}