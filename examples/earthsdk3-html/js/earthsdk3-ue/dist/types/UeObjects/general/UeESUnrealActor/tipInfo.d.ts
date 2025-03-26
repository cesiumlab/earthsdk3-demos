export declare const getTipInfo: (num: number) => "成功绑定" | "解绑之前的内容,成功绑定" | "未知错误" | "未搜索到ActorTag,无法绑定" | "搜索到ActorTag但对应的Actor不是场景原有的,而是新建的,无法绑定" | "搜索到ActorTag对应的Actor是地形或3DTileset,无法绑定";
export declare const getCreatedInfo: (num: number) => "未知错误" | "创建成功" | "未找到对应的资源，无法创建" | "Id与场景中现有的ActorTag重复,创建后可能出现问题,创建失败";
