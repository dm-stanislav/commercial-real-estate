const clearQuery = (url) => {
    const urlObj = new URL(url)
    const params = urlObj.search

    return url.replace(params, '')
}

const manageForm = ({
    data, failed, form, components,
}) => {
    // Об'єкт з даними
    const parsedData = JSON.parse(data)
    console.log(parsedData)

    /*
    *
    * 1. failed = true, якщо форма не пройшла валідацію
    * 2. form - поточна форма, яка відправляється
    * 3. components містить в собі компоненти: alert, toast і модалки
    * 4. модалки відкривають так само, як в минулих проєктах (modals.open(id), modals.close())
    * 5. alert і toast мають методи open/closeAlert і open/closeToast відповідно
    * 6. щоб відкрити тост чи алерт, потрібно в якості аргумента передати або сам алерт/тост елемент
    * (той, що має клас .alert/.toast), або селектор
    * 7. тости мають таймаут, його можна виключити (як на компоненті з кукі)
    *
    * */

    // Приклад, як включати тост:
    const failedFormToast = document.getElementById('form_error')

    if (failedFormToast && failed) components.toast.openToast(failedFormToast)
    // Можна було аргументом дати строку "#formErrorToast", бо айді унікальний

    /*
    *
    * 1. Щоб створити карту, потрібно на сторінці розмістити елемент з id "googleMap"
    * 2. Щоб добавити точки на карту, потрібно створити на сторінці елементи з наступними атрибутами:
    * - data-map -- пустий атрибут, по ньому шукається елемент
    * - data-address -- строка з адерсою, наприклад, "Тернопіль, вул. Бандери, 12" (так, як вбивається зазвичай в пошуку в картах)
    * - data-info -- опціональний атрибут, в ньому вписується контент для вікон, які показуються при кліку на точку; можна вписати HTML розмітку
    * - При наведенні на елемент з атрибутом data-map, карта, якщо вона знайдена на сторінці, автоматично проскролить до точки, за яку елемент відповідає
    * - При кліку на точку на карті сторінка скролиться до елемента, який їй відповідає
    * - Щоб уникнути останніх двох пунктів, треба просто приховати елемент (як на сторінці сінгл), можна просто створити span зі всіма атрибутами і дати йому атрибут hidden
    *
    * */

    // Не проходить валідацію - відправки не буде
    if (failed) {
        return false
    }

    if (form.id === 'someId') {
        console.log('Action before submit...')

        // Можна відмінити відправку:
        // return false
    }

    // ================================================================ //
    // ================================================================ //
    // ================================================================ //

    const { action } = form

    if (action) {
        const clearedAction = clearQuery(action)
        const query = []

        for (const key of Object.keys(parsedData)) {
            const currentDatum = parsedData[key]
            let datumReady

            switch (typeof currentDatum) {
            case 'string':
                datumReady = currentDatum
                break

            case 'object':
                const filtered = currentDatum.filter((datum) => datum.length)
                if (filtered.length) {
                    datumReady = currentDatum.join('|')
                } else {
                    datumReady = ''
                }
                break
            }

            if (datumReady.length) query.push(`${key}=${datumReady}`)
        }

        window.location.href = `${clearedAction}?${query.join('&')}`
    }
}
