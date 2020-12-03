import store from '../store'

const locales = {
    'ru-RU': {
        'ProfileTitle': 'Профиль'
    },
    'en-US': {
        'ProfileTitle': 'Profile'
    }
}

export default function localize(key) {
    const local = store.getters.info.locale || 'ru-RU'

    return locales[local][key]
}
