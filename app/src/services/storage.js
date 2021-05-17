export class AppStorage {
    constructor(storage) {
        this.storage = storage || window.localStorage || window.sessionStorage;

        if (!this.isSupported()) {
            throw new Error('Storage is not supported by browser!');
        }
    }

    setItem(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return JSON.parse(this.storage.getItem(key));
    }

    removeItem(key) {
        this.storage.removeItem(key);
    }

    clear() {
        this.storage.clear();
    }

    /**
     * @description Check for storage support
     * @returns {boolean} supported
     * */
    isSupported() {
        let supported = true;

        if (!this.storage) {
            supported = false;
        }

        return supported;
    }
}


const LocalStorage = new AppStorage();
const SessionStorage = new AppStorage(window.sessionStorage);

export { LocalStorage, SessionStorage };
