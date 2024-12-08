/**
 * 处理菜单数据中的图标编码，移除多余的反斜杠
 * @param {Object|Array} data - 要处理的数据对象或数组
 * @returns {Object|Array} - 处理后的数据
 */
const formatMenuIcons = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => formatMenuIcons(item));
    }
    
    if (data && typeof data === 'object') {
        const newData = { ...data };
        
        // 处理当前对象的 icon 属性
        if (newData.icon && typeof newData.icon === 'string') {
            newData.icon = newData.icon.replace(/\\\\u/, '\\u');
        }
        
        // 递归处理子属性
        Object.keys(newData).forEach(key => {
            if (typeof newData[key] === 'object' && newData[key] !== null) {
                newData[key] = formatMenuIcons(newData[key]);
            }
        });
        
        return newData;
    }
    
    return data;
};

module.exports = {
    formatMenuIcons
}; 