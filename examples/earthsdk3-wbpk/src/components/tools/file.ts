export type FileHandleType = {
  readonly kind: string;
  readonly name: string;
};

const acceptsOptions = {
  json: {
    description: 'JSON Files',
    accept: {
      'text/json': '.json',
    },
  },
  js: {
    description: 'JS Files',
    accept: {
      'text/js': '.js',
    },
  },
  txt: {
    description: 'Text Files',
    accept: {
      'text/plain': ['.txt', '.text'],
    },
  },
}

export async function getOpenFileHandle(type?: 'txt' | 'js' | 'json') {
  const option = acceptsOptions[type ?? 'json']
  try {
    // @ts-ignore
    const [handle] = await showOpenFilePicker({
      multiple: false,
      types: [option],
      excludeAcceptAllOption: true,
    });

    return handle as FileHandleType | undefined;
  } catch (error) {
    console.warn(`getOpenFileHandle error: ${error}`);
    return undefined;
  }
}

export async function getSaveFileHandle(type?: 'txt' | 'js' | 'json', suggestedName?: string) {
  const option = acceptsOptions[type ?? 'json']
  try {
    // @ts-ignore
    const handle = await showSaveFilePicker({
      suggestedName: suggestedName ?? `未命名.${type ?? "json"}`,
      types: [option],
    });
    return handle as FileHandleType | undefined;
  } catch (error) {
    console.warn(`getSaveFileHandle error: ${error}`);
    return undefined;
  }
}

export async function requestWriteAccess(handle: FileHandleType) {
  // @ts-ignore
  // 这里的 options 用来声明对文件的权限，能否写入
  const options: FileSystemHandlePermissionDescriptor = {
    writable: true,
    mode: 'readwrite',
  };
  // 然后向用户要求权限
  if (
    // @ts-ignore
    (await handle.queryPermission(options)) !== 'granted'
    // && 
    // // @ts-ignore
    // (await handle.requestPermission(options)) !== 'granted'
  ) {
    return false;
  } else {
    return true;
  }
}

export async function getTextFromFile(handle: FileHandleType) {//.js .txt .json都可使用
  try {
    // @ts-ignore
    const file = await handle.getFile();
    const str = await file.text() as string;
    return str;
  } catch (error) {
    console.warn(`getTextFromFile error: ${error}`);
    return undefined;
  }
}

export async function saveFile(handle: FileHandleType, str: string) { //.js .txt .json都可使用
  const blob = new Blob([str], { type: "text/plain;charset=utf-8", });
  // @ts-ignore
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

