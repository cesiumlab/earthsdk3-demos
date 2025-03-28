function defined(value) {
  return value !== undefined && value !== null;
}
function formatError(object) {
  let result;

  const name = object.name;
  const message = object.message;
  if (defined(name) && defined(message)) {
    result = `${name}: ${message}`;
  } else {
    result = object.toString();
  }

  const stack = object.stack;
  if (defined(stack)) {
    result += `\n${stack}`;
  }

  return result;
}
function createTaskProcessorWorker(workerFunction) {
  async function onMessageHandler({ data }) {
    const transferableObjects = [];
    const responseMessage = {
      id: data.id,
      result: undefined,
      error: undefined,
    };

    self.CESIUM_BASE_URL = data.baseUrl;

    try {
      const result = await workerFunction(data.parameters, transferableObjects);
      responseMessage.result = result;
    } catch (error) {
      if (error instanceof Error) {
        responseMessage.error = {
          name: error.name,
          message: error.message,
          stack: error.stack,
        };
      } else {
        responseMessage.error = error;
      }
    }

    if (!data.canTransferArrayBuffer) {
      transferableObjects.length = 0;
    }

    try {
      postMessage(responseMessage, transferableObjects);
    } catch (error) {
      // something went wrong trying to post the message, post a simpler
      // error that we can be sure will be cloneable
      responseMessage.result = undefined;
      responseMessage.error = `postMessage failed with error: ${formatError(
        error,
      )}\n  with responseMessage: ${JSON.stringify(responseMessage)}`;
      postMessage(responseMessage);
    }
  }

  function onMessageErrorHandler(event) {
    postMessage({
      id: event.data?.id,
      error: `postMessage failed with error: ${JSON.stringify(event)}`,
    });
  }

  self.onmessage = onMessageHandler;
  self.onmessageerror = onMessageErrorHandler;
  return self;
}
let wasm;

function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } });

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getUint32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_2.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}

function generate_texture_from_attrs(positions, scales, rots, colors, count) {
  const ret = wasm.generate_texture_from_attrs(positions, scales, rots, colors, count);
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return TextureData.__wrap(ret[0]);
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
  if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
    cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
  }
  return cachedFloat32ArrayMemory0;
}

function passArrayF32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getFloat32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

const TextureDataFinalization = (typeof FinalizationRegistry === 'undefined')
  ? { register: () => { }, unregister: () => { } }
  : new FinalizationRegistry(ptr => wasm.__wbg_texturedata_free(ptr >>> 0, 1));

class TextureData {

  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(TextureData.prototype);
    obj.__wbg_ptr = ptr;
    TextureDataFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TextureDataFinalization.unregister(this);
    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_texturedata_free(ptr, 0);
  }
  /**
   * @returns {Uint32Array}
   */
  get data() {
    const ret = wasm.texturedata_data(this.__wbg_ptr);
    var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {number}
   */
  get width() {
    const ret = wasm.texturedata_width(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  get height() {
    const ret = wasm.texturedata_height(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {Uint32Array} data
   * @param {number} width
   * @param {number} height
   * @returns {TextureData}
   */
  static new(data, width, height) {
    const ptr0 = passArray32ToWasm0(data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.texturedata_new(ptr0, len0, width, height);
    return TextureData.__wrap(ret);
  }
}

async function __wbg_load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);

      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);

  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };

    } else {
      return instance;
    }
  }
}

function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_buffer_61b7ce01341d7f88 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_length_65d1cd11729ced11 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_81a294bd2038fd26 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_9d7c41656543fe86 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_new_254fa9eac11932ae = function() {
    const ret = new Array();
    return ret;
  };
  imports.wbg.__wbg_new_3ff5b33b1ce712df = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_688846f374351c92 = function() {
    const ret = new Object();
    return ret;
  };
  imports.wbg.__wbg_new_b9ea1588c9985b80 = function(arg0) {
    const ret = new Float32Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_5910bdf845a168eb = function(arg0, arg1, arg2) {
    const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_ba35896968751d91 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_f113a96374814bb2 = function(arg0, arg1, arg2) {
    const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithlength_1761a9eb039ca429 = function(arg0) {
    const ret = new Uint32Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithlength_34ce8f1051e74449 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithlength_ed665315b76ec334 = function(arg0) {
    const ret = new Float32Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_push_6edad0df4b546b2c = function(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
  };
  imports.wbg.__wbg_set_23d69db4e5c66a6e = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_set_4474fae9281eafb1 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_set_4e647025551483bd = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = Reflect.set(arg0, arg1, arg2);
      return ret;
    }, arguments)
  };
  imports.wbg.__wbg_set_d2ca640bc040b031 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return ret;
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };

  return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedFloat32ArrayMemory0 = null;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;


  wasm.__wbindgen_start();
  return wasm;
}

function initSync(module) {
  if (wasm !== undefined) return wasm;


  if (typeof module !== 'undefined') {
    if (Object.getPrototypeOf(module) === Object.prototype) {
      ({ module } = module)
    } else {
      console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
    }
  }

  const imports = __wbg_get_imports();

  __wbg_init_memory(imports);

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }

  const instance = new WebAssembly.Instance(module, imports);

  return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
  if (wasm !== undefined) return wasm;


  if (typeof module_or_path !== 'undefined') {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path)
    } else {
      console.warn('using deprecated parameters for the initialization function; pass a single object instead')
    }
  }

  if (typeof module_or_path === 'undefined') {
    module_or_path = new URL('http://localhost:9004/wasm_splats_bg.wasm', import.meta.url);
  }
  const imports = __wbg_get_imports();

  if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
    module_or_path = fetch(module_or_path);
  }

  __wbg_init_memory(imports);

  const { instance, module } = await __wbg_load(await module_or_path, imports);

  return __wbg_finalize_init(instance, module);
}
//load built wasm modules for sorting. Ensure we can load webassembly and we support SIMD.
async function initWorker(parameters, transferableObjects) {
  // Require and compile WebAssembly module, or use fallback if not supported
  const wasmConfig = parameters.webAssemblyConfig;
  if (defined(wasmConfig) && defined(wasmConfig.wasmBinary)) {
    initSync(wasmConfig.wasmBinary);
    return true;
  }
  return false;
}

async function generateSplatTextureWorker(parameters, transferableObjects) {
  const wasmConfig = parameters.webAssemblyConfig;
  if (defined(wasmConfig)) {
    return initWorker(parameters, transferableObjects);
  }

  const { attributes, count } = parameters;
  const result = generate_texture_from_attrs(
    attributes.positions,
    attributes.scales,
    attributes.rotations,
    attributes.colors,
    count,
  );

  return {
    data: result.data,
    width: result.width,
    height: result.height,
  };
}

export default createTaskProcessorWorker(generateSplatTextureWorker);
