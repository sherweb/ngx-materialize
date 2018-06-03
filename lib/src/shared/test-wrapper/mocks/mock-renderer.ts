import { RenderDebugInfo } from '@angular/core/src/render/api';

// tslint:disable:max-line-length

export const mockRenderer = {
  selectRootElement: (selectorOrNode: string | { }, debugInfo?: RenderDebugInfo) => { },
  createElement: (parentElement: { }, name: string, debugInfo?: RenderDebugInfo) => { },
  createViewRoot: (hostElement: any) => { },
  createTemplateAnchor: (parentElement: { }, debugInfo?: RenderDebugInfo) => { },
  createText: (parentElement: { }, value: string, debugInfo?: RenderDebugInfo) => { },
  projectNodes: (parentElement: { }, nodes: any[]) => { },
  attachViewAfter: (node: { }, viewRootNodes: any[]) => { },
  detachView: (viewRootNodes: any[]) => { },
  destroyView: (hostElement: { }, viewAllNodes: any[]) => { },
  listen: (renderElement: { }, name: string, callback: Function) => Function,
  listenGlobal: (target: string, name: string, callback: Function) => Function,
  setElementProperty: (renderElement: { }, propertyName: string, propertyValue: any) => { },
  setElementAttribute: (renderElement: { }, attributeName: string, attributeValue: string) => { },
  setBindingDebugInfo: (renderElement: { }, propertyName: string, propertyValue: string) => { },
  setElementClass: (renderElement: { }, className: string, isAdd: boolean) => { },
  setElementStyle: (renderElement: { }, styleName: string, styleValue: string) => { },
  invokeElementMethod: (renderElement: { }, methodName: string, args?: any[]) => { },
  setText: (renderNode: { }, text: string) => { },
  animate: (element: { }, startingStyles: { }, keyframes: any[], duration: number, delay: number, easing: string, previousPlayers?: any[]) => { },
};
