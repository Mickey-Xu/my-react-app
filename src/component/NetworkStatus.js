import { useState, useEffect } from 'react';

// 自定义 Hook: useNetworkStatus
const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
  
    const camera = window.localStorage.getItem("camera");
    useEffect(() => {
        // 在线状态变化时更新状态
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        // 订阅浏览器的 online 和 offline 事件
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // alert("更新了");

        // 清理事件监听器
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [camera]); // 空依赖数组，表示只在组件挂载和卸载时运行

    return isOnline;
};

export default useNetworkStatus;
