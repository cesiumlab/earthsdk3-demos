import type { ESObjectsManager, ESViewer, ESVOption } from 'earthsdk3';
import { useEffect, useRef } from 'react';
import './style.css';

export default function Container({ objm }: { objm: ESObjectsManager }) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // 切换引擎
    const switchViewer = (type: 'cesium' | 'ue') => {
        if (!containerRef.current) return;
        let option: ESVOption = {
            type: 'ESCesiumViewer',
            container: containerRef.current
        };
        if (type === 'ue') {
            option = {
                type: 'ESUeViewer',
                container: containerRef.current,
                options: {
                    uri: 'http://localhost:9007/',
                    app: 'earthsdk3'
                }
            };
        }
        objm.switchViewer(option);
    };


    // 初始化Cesium
    let viewer: ESViewer | null = null;
    useEffect(() => {
        if (viewer || !containerRef.current) return;
        viewer = objm.createCesiumViewer(containerRef.current);
        console.log('viewer', viewer);
    }, []);

    return (
        <div className="box">
            <div className="btn-box">
                <button className="btn" onClick={() => switchViewer('cesium')}>切换Cesium</button>
                <button className="btn" onClick={() => switchViewer('ue')}>切换UE</button>
            </div>
            <div className="container" ref={containerRef}></div>
        </div>
    );
}
