import { ESObjectsManager } from 'earthsdk3';
import { ESCesiumViewer } from 'earthsdk3-cesium';
import { ESUeViewer } from 'earthsdk3-ue';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Container from './Container.tsx';

const objm = new ESObjectsManager(ESUeViewer, ESCesiumViewer);

const container = document.getElementById('root');

createRoot(container!).render(
  <StrictMode>
    <Container objm={objm} />
  </StrictMode>,
)

objm.sceneTree.createSceneObjectTreeItemFromJson({
  "id": "ae103185-08c7-4ed0-b6d4-15ad77bbbf66",
  "type": "ESImageryLayer",
  "url": "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  "maximumLevel": 18,
  "name": "全球影像",
  "allowPicking": true
})
