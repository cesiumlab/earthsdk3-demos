import { JsonValue } from "earthsdk3";
import { ElMessage } from "element-plus";

/**
 * 保存json文件
 * @param json
 * @param name
 */
export const downloadJson = async (
  json: JsonValue,
  name?: string,
  flag: boolean = false
) => {
  try {
    // 判断如果是字符串直接使用，否则转换为JSON字符串
    const content =
      typeof json === "string" ? json : JSON.stringify(json, null, 2);
    // 创建Blob对象
    const blob = new Blob([content], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name || "未命名.json";
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    }, 100);
    flag && ElMessage.success("下载成功");
    return true;
  } catch (error) {
    console.error(error);
    flag && ElMessage.error("下载失败");
    return false;
  }
};
