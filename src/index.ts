const isQuotaExceededError = (err: unknown): boolean => {
  return (
    err instanceof DOMException &&
    // everything except Firefox
    (err.code === 22 ||
      // Firefox
      err.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      err.name === "QuotaExceededError" ||
      // Firefox
      err.name === "NS_ERROR_DOM_QUOTA_REACHED")
  );
}

type ErrMsg = string;

type WebStorageType = "localStorage" | "sessionStorage";

const sessionStorageCache: Map<string, string> = new Map<string, string>();
const localStorageCache: Map<string, string> = new Map<string, string>();

const trySetStorageItem = (
  key: string,
  val: string,
  webStorageType: WebStorageType = "localStorage"
): ErrMsg => {
  const storage: Storage | undefined = window[webStorageType];

  if (!storage) {
    // Fallback to in-memory storage
    window[webStorageType] = new StorageCache();
    window[webStorageType].setItem(key, val);
    return 'StorageNotSupported';
  }

  try {
    storage.setItem(key, val);
    return '';
  } catch (err) {
    const isValidQuotaExceededError =
      isQuotaExceededError(err) && storage.length > 0;

    if (isValidQuotaExceededError) {
      window[webStorageType].storageCache = new StorageCache();
      return  'QuotaExceededError'
    }

    return err.message;
  }
}

const syncStorage = () => {

}
