import{aq as p,am as Le,al as Q,b7 as We,b9 as de,ba as he,cd as Ye,aQ as C,aO as R,aJ as fe,bd as v,aW as P,bx as pe,aY as X,as as L,K as me,aF as q,aC as A,U as k,ce as He,cf as j,bg as W,cg as G,aI as J,aH as D,aV as N,bq as Ke,bp as Y,ch as Xe,aR as ge,aU as xe,bz as _e,bC as be,ci as ye,aS as qe,aT as je,bA as Ne,bB as $e,bD as Qe,cj as Je,ck as Ze,cl as et,cm as H,S as tt,cn as rt,aP as Te,bu as Z,co as ee,cp as E,at as m,cq as nt}from"./main-DT8r8yOu.js";import{c as I,a as st,b as at,B as ve}from"./colorToUniform-BXaCBwVl.js";import"./index-DAwDlNDO.js";class Ce{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:n,clientHeight:s}=this._resizeTo;t=n,r=s}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Ce.extension=p.Application;class Pe{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,Le.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?Q.shared:new Q,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Pe.extension=p.Application;var it=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,te=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class ot extends We{constructor(){const e=de.from({vertex:{source:te,entryPoint:"mainVertex"},fragment:{source:te,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=he.from({vertex:Ye,fragment:it,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class we{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}we.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"filter"};const re=new C;function ut(i,e){var r;e.clear();const t=e.matrix;for(let n=0;n<i.length;n++){const s=i[n];if(s.globalDisplayStatus<7)continue;const a=(r=s.renderGroup)!=null?r:s.parentRenderGroup;a!=null&&a.isCachedAsTexture?e.matrix=re.copyFrom(a.textureOffsetInverseTransform).append(s.worldTransform):a!=null&&a._parentCacheAsTextureRenderGroup?e.matrix=re.copyFrom(a._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(s.groupTransform):e.matrix=s.worldTransform,e.addBounds(s.bounds)}return e.matrix=t,e}const lt=new pe({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class ct{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new me,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class Se{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new R({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new fe({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,n=this._pushFilterData();n.skip=!1,n.filters=r,n.container=e.container,n.outputRenderSurface=t.renderTarget.renderSurface;const s=t.renderTarget.renderTarget.colorTexture.source,a=s.resolution,o=s.antialias;if(r.every(f=>!f.enabled)){n.skip=!0;return}const u=n.bounds;if(this._calculateFilterArea(e,u),this._calculateFilterBounds(n,t.renderTarget.rootViewPort,o,a,1),n.skip)return;const l=this._getPreviousFilterData(),h=this._findFilterResolution(a);let d=0,c=0;l&&(d=l.bounds.minX,c=l.bounds.minY),this._calculateGlobalFrame(n,d,c,h,s.width,s.height),this._setupFilterTextures(n,u,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const n=e.source,s=n.resolution,a=n.antialias;if(t.every(f=>!f.enabled))return r.skip=!0,e;const o=r.bounds;if(o.addRect(e.frame),this._calculateFilterBounds(r,o.rectangle,a,s,0),r.skip)return e;const u=s;this._calculateGlobalFrame(r,0,0,u,n.width,n.height),r.outputRenderSurface=v.getOptimalTexture(o.width,o.height,r.resolution,r.antialias),r.backTexture=P.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const c=r.outputRenderSurface;return c.source.alphaMode="premultiplied-alpha",c}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&v.returnTexture(t.backTexture),v.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const n=e.colorTexture.source._resolution,s=v.getOptimalTexture(t.width,t.height,n,!1);let a=t.minX,o=t.minY;r&&(a-=r.minX,o-=r.minY),a=Math.floor(a*n),o=Math.floor(o*n);const u=Math.ceil(t.width*n),l=Math.ceil(t.height*n);return this.renderer.renderTarget.copyToTexture(e,s,{x:a,y:o},{width:u,height:l},{x:0,y:0}),s}applyFilter(e,t,r,n){const s=this.renderer,a=this._activeFilterData,u=a.outputRenderSurface===r,l=s.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=this._findFilterResolution(l);let d=0,c=0;if(u){const g=this._findPreviousFilterOffset();d=g.x,c=g.y}this._updateFilterUniforms(t,r,a,d,c,h,u,n);const f=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(f,t,s)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,n=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),s=t.worldTransform.copyTo(C.shared),a=t.renderGroup||t.parentRenderGroup;return a&&a.cacheToLocalTransform&&s.prepend(a.cacheToLocalTransform),s.invert(),n.prepend(s),n.scale(1/t.texture.orig.width,1/t.texture.orig.height),n.translate(t.anchor.x,t.anchor.y),n}destroy(){var e;(e=this._passthroughFilter)==null||e.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){var e;return(e=this._passthroughFilter)!=null||(this._passthroughFilter=new ot),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const n=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(n,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:lt,shader:e,state:e._state,topology:"triangle-list"}),r.type===X.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,n){if(e.backTexture=P.EMPTY,e.inputTexture=v.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const s=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(s,t,n==null?void 0:n.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,n,s,a){const o=e.globalFrame;o.x=t*n,o.y=r*n,o.width=s*n,o.height=a*n}_updateFilterUniforms(e,t,r,n,s,a,o,u){const l=this._filterGlobalUniforms.uniforms,h=l.uOutputFrame,d=l.uInputSize,c=l.uInputPixel,f=l.uInputClamp,g=l.uGlobalFrame,x=l.uOutputTexture;o?(h[0]=r.bounds.minX-n,h[1]=r.bounds.minY-s):(h[0]=0,h[1]=0),h[2]=e.frame.width,h[3]=e.frame.height,d[0]=e.source.width,d[1]=e.source.height,d[2]=1/d[0],d[3]=1/d[1],c[0]=e.source.pixelWidth,c[1]=e.source.pixelHeight,c[2]=1/c[0],c[3]=1/c[1],f[0]=.5*c[2],f[1]=.5*c[3],f[2]=e.frame.width*d[2]-.5*c[2],f[3]=e.frame.height*d[3]-.5*c[3];const _=this.renderer.renderTarget.rootRenderTarget.colorTexture;g[0]=n*a,g[1]=s*a,g[2]=_.source.width*a,g[3]=_.source.height*a,t instanceof P&&(t.source.resource=null);const b=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!u),t instanceof P?(x[0]=t.frame.width,x[1]=t.frame.height):(x[0]=b.width,x[1]=b.height),x[2]=b.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const n=this._filterStack[r];if(!n.skip){e=n.bounds.minX,t=n.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?ut(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const n=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;n&&t.applyMatrix(n)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,n=e.bounds,s=e.filters,a=e.firstEnabledIndex,o=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),a===o)s[a].apply(this,r,e.outputRenderSurface,t);else{let u=e.inputTexture;const l=v.getOptimalTexture(n.width,n.height,u.source._resolution,!1);let h=l;for(let d=a;d<o;d++){const c=s[d];if(!c.enabled)continue;c.apply(this,u,h,!0);const f=u;u=h,h=f}s[o].apply(this,u,e.outputRenderSurface,t),v.returnTexture(l)}}_calculateFilterBounds(e,t,r,n,s){var b,S;const a=this.renderer,o=e.bounds,u=e.filters;let l=1/0,h=0,d=!0,c=!1,f=!1,g=!0,x=-1,_=-1;for(let T=0;T<u.length;T++){const y=u[T];if(!y.enabled)continue;if(x===-1&&(x=T),_=T,l=Math.min(l,y.resolution==="inherit"?n:y.resolution),h+=y.padding,y.antialias==="off"?d=!1:y.antialias==="inherit"&&d&&(d=r),y.clipToViewport||(g=!1),!!!(y.compatibleRenderers&a.type)){f=!1;break}if(y.blendRequired&&!((S=(b=a.backBuffer)==null?void 0:b.useBackBuffer)==null||S)){L("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=!0,c||(c=y.blendRequired)}if(!f){e.skip=!0;return}if(g&&o.fitBounds(0,t.width/n,0,t.height/n),o.scale(l).ceil().scale(1/l).pad((h|0)*s),!o.isPositive){e.skip=!0;return}e.antialias=d,e.resolution=l,e.blendRequired=c,e.firstEnabledIndex=x,e.lastEnabledIndex=_}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new ct),this._filterStackIndex++,e}}Se.extension={type:[p.WebGLSystem,p.WebGPUSystem],name:"filter"};const ne="http://www.w3.org/2000/svg",se="http://www.w3.org/1999/xhtml";class Re{constructor(){this.svgRoot=document.createElementNS(ne,"svg"),this.foreignObject=document.createElementNS(ne,"foreignObject"),this.domElement=document.createElementNS(se,"div"),this.styleElement=document.createElementNS(se,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:n}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(n),this.image=q.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let ae;function dt(i,e,t,r){r||(r=ae||(ae=new Re));const{domElement:n,styleElement:s,svgRoot:a}=r;n.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${i}</div>`,n.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(s.textContent=t),document.body.appendChild(a);const o=n.getBoundingClientRect();a.remove();const u=e.padding*2;return{width:o.width-u,height:o.height-u}}class ht{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{k.return(e)}),this.batches.length=0}}class Ue{constructor(e,t){this.state=A.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,n=this.renderer.graphicsContext.updateGpuContext(t);return!!(n.isBatchable||r!==n.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let n=0;n<r.length;n++){const s=r[n];s._batcher.updateElement(s)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const s=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const a=s.resources.localUniforms.uniforms;a.uTransformMatrix=e.groupTransform,a.uRound=t._roundPixels|e._roundPixels,I(e.groupColorAlpha,a.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,n=this._getGpuDataForRenderable(e).batches;for(let s=0;s<n.length;s++){const a=n[s];r.addToBatch(a,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new ht;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,n=this.renderer.graphicsContext.getGpuContext(r),s=this.renderer._roundPixels|e._roundPixels;t.batches=n.batches.map(a=>{const o=k.get(He);return a.copyTo(o),o.renderable=e,o.roundPixels=s,o})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}Ue.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"graphics"};class ${constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let n=r;const s=this.texture.textureMatrix;return s.isSimple||(n=this._transformedUvs,(this._textureMatrixUpdateId!==s._updateID||this._uvUpdateId!==t._updateID)&&((!n||n.length<r.length)&&(n=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=s._updateID,this._uvUpdateId=t._updateID,s.multiplyUvs(r,n))),n}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class ie{destroy(){}}class Fe{constructor(e,t){this.localUniforms=new R({uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new fe({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,n=e.batched;if(t.batched=n,r!==n)return!0;if(n){const s=e._geometry;if(s.indices.length!==t.indexSize||s.positions.length!==t.vertexSize)return t.indexSize=s.indices.length,t.vertexSize=s.positions.length,!0;const a=this._getBatchableMesh(e);return a.texture.uid!==e._texture.uid&&(a._textureMatrixUpdateId=-1),!a._batcher.checkAndUpdateTexture(a,e._texture)}return!1}addRenderable(e,t){var s,a;const r=this.renderer.renderPipes.batch,n=this._getMeshData(e);if(e.didViewUpdate&&(n.indexSize=(s=e._geometry.indices)==null?void 0:s.length,n.vertexSize=(a=e._geometry.positions)==null?void 0:a.length),n.batched){const o=this._getBatchableMesh(e);o.setTexture(e._texture),o.geometry=e._geometry,r.addToBatch(o,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=j(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),I(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new ie),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new ie),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new $;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Fe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"mesh"};class ft{execute(e,t){const r=e.state,n=e.renderer,s=t.shader||e.defaultShader;s.resources.uTexture=t.texture._source,s.resources.uniforms=e.localUniforms;const a=n.gl,o=e.getBuffers(t);n.shader.bind(s),n.state.set(r),n.geometry.bind(o.geometry,s.glProgram);const l=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,l,0)}}class pt{execute(e,t){const r=e.renderer,n=t.shader||e.defaultShader;n.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),n.groups[1]=r.texture.getTextureBindGroup(t.texture);const s=e.state,a=e.getBuffers(t);r.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:s,size:t.particleChildren.length*6})}}function oe(i,e=null){const t=i*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,n=0;r<t;r+=6,n+=4)e[r+0]=n+0,e[r+1]=n+1,e[r+2]=n+2,e[r+3]=n+0,e[r+4]=n+2,e[r+5]=n+3;return e}function mt(i){return{dynamicUpdate:ue(i,!0),staticUpdate:ue(i,!1)}}function ue(i,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const s in i){const a=i[s];if(e!==a.dynamic)continue;t.push(`offset = index + ${r}`),t.push(a.code);const o=W(a.format);r+=o.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const n=t.join(`
`);return new Function("ps","f32v","u32v",n)}class gt{constructor(e){var h;this._size=0,this._generateParticleUpdateCache={};const t=this._size=(h=e.size)!=null?h:1e3,r=e.properties;let n=0,s=0;for(const d in r){const c=r[d],f=W(c.format);c.dynamic?s+=f.stride:n+=f.stride}this._dynamicStride=s/4,this._staticStride=n/4,this.staticAttributeBuffer=new G(t*4*n),this.dynamicAttributeBuffer=new G(t*4*s),this.indexBuffer=oe(t);const a=new pe;let o=0,u=0;this._staticBuffer=new J({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:D.VERTEX|D.COPY_DST}),this._dynamicBuffer=new J({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:D.VERTEX|D.COPY_DST});for(const d in r){const c=r[d],f=W(c.format);c.dynamic?(a.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:c.format}),o+=f.size):(a.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:u*4,format:c.format}),u+=f.size)}a.addIndex(this.indexBuffer);const l=this.getParticleUpdate(r);this._dynamicUpload=l.dynamicUpdate,this._staticUpload=l.staticUpdate,this.geometry=a}getParticleUpdate(e){const t=xt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return mt(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new G(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new G(this._size*this._dynamicStride*4*4),this.indexBuffer=oe(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const n=this.staticAttributeBuffer;this._staticUpload(e,n.float32View,n.uint32View),this._staticBuffer.setDataWithSize(n.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function xt(i){const e=[];for(const t in i){const r=i[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var _t=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,bt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,le=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class yt extends N{constructor(){const e=he.from({vertex:bt,fragment:_t}),t=de.from({fragment:{source:le,entryPoint:"mainFragment"},vertex:{source:le,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:P.WHITE.source,uSampler:new Y({}),uniforms:{uTranslationMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Ke(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class Be{constructor(e,t){this.state=A.for2d(),this.localUniforms=new R({uTranslationMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new yt,this.state=A.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new gt({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,n=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const s=this.state;n.update(t,e._childrenDirty),e._childrenDirty=!1,s.blendMode=j(e.blendMode,e.texture._source);const a=this.localUniforms.uniforms,o=a.uTranslationMatrix;e.worldTransform.copyTo(o),o.prepend(r.globalUniforms.globalUniformData.projectionMatrix),a.uResolution=r.globalUniforms.globalUniformData.resolution,a.uRound=r._roundPixels|e._roundPixels,I(e.groupColorAlpha,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Me extends Be{constructor(e){super(e,new ft)}}Me.extension={type:[p.WebGLPipes],name:"particle"};class Ge extends Be{constructor(e){super(e,new pt)}}Ge.extension={type:[p.WebGPUPipes],name:"particle"};class Tt extends ${constructor(){super(),this.geometry=new Xe}destroy(){this.geometry.destroy()}}class De{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new Tt,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}De.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"nineSliceSprite"};const vt={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},Ct={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let U,F;class Pt extends N{constructor(){U!=null||(U=ge({name:"tiling-sprite-shader",bits:[st,vt,xe]})),F!=null||(F=_e({name:"tiling-sprite-shader",bits:[at,Ct,be]}));const e=new R({uMapCoord:{value:new C,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new C,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:F,gpuProgram:U,resources:{localUniforms:new R({uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:P.EMPTY.source,uSampler:P.EMPTY.source.style}})}updateUniforms(e,t,r,n,s,a){const o=this.resources.tilingUniforms,u=a.width,l=a.height,h=a.textureMatrix,d=o.uniforms.uTextureTransform;d.set(r.a*u/e,r.b*u/t,r.c*l/e,r.d*l/t,r.tx/e,r.ty/t),d.invert(),o.uniforms.uMapCoord=h.mapCoord,o.uniforms.uClampFrame=h.uClampFrame,o.uniforms.uClampOffset=h.uClampOffset,o.uniforms.uTextureTransform=d,o.uniforms.uSizeAnchor[0]=e,o.uniforms.uSizeAnchor[1]=t,o.uniforms.uSizeAnchor[2]=n,o.uniforms.uSizeAnchor[3]=s,a&&(this.resources.uTexture=a.source,this.resources.uSampler=a.source.style)}}class wt extends ye{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function St(i,e){const t=i.anchor.x,r=i.anchor.y;e[0]=-t*i.width,e[1]=-r*i.height,e[2]=(1-t)*i.width,e[3]=-r*i.height,e[4]=(1-t)*i.width,e[5]=(1-r)*i.height,e[6]=-t*i.width,e[7]=(1-r)*i.height}function Rt(i,e,t,r){let n=0;const s=i.length/e,a=r.a,o=r.b,u=r.c,l=r.d,h=r.tx,d=r.ty;for(t*=e;n<s;){const c=i[t],f=i[t+1];i[t]=a*c+u*f+h,i[t+1]=o*c+l*f+d,t+=e,n++}}function Ut(i,e){const t=i.texture,r=t.frame.width,n=t.frame.height;let s=0,a=0;i.applyAnchorToTexture&&(s=i.anchor.x,a=i.anchor.y),e[0]=e[6]=-s,e[2]=e[4]=1-s,e[1]=e[3]=-a,e[5]=e[7]=1-a;const o=C.shared;o.copyFrom(i._tileTransform.matrix),o.tx/=i.width,o.ty/=i.height,o.invert(),o.scale(i.width/r,i.height/n),Rt(e,2,0,o)}const z=new wt;class Ft{constructor(){this.canBatch=!0,this.geometry=new ye({indices:z.indices.slice(),positions:z.positions.slice(),uvs:z.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class ze{constructor(e){this._state=A.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const n=t.canBatch;if(n&&n===r){const{batchableMesh:s}=t;return!s._batcher.checkAndUpdateTexture(s,e.texture)}return r!==n}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const n=this._getTilingSpriteData(e),{geometry:s,canBatch:a}=n;if(a){n.batchableMesh||(n.batchableMesh=new $);const o=n.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),o.geometry=s,o.renderable=e,o.transform=e.groupTransform,o.setTexture(e._texture)),o.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(o,t)}else r.break(t),n.shader||(n.shader=new Pt),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,I(e.groupColorAlpha,r.uColor,0),this._state.blendMode=j(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:z,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:n}=t;e.didViewUpdate&&this._updateBatchableMesh(e),n._batcher.updateElement(n)}else if(e.didViewUpdate){const{shader:n}=t;n.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new Ft;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,n=e.texture.source.style;n.addressMode!=="repeat"&&(n.addressMode="repeat",n.update()),Ut(e,r.uvs),St(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let n=!0;return this._renderer.type===X.WEBGL&&(n=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(n||r.source.isPowerOfTwo),t.canBatch}}ze.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"tilingSprite"};const Bt={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},Mt={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},Gt={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},Dt={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let B,M;class zt extends N{constructor(e){const t=new R({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});B!=null||(B=ge({name:"sdf-shader",bits:[qe,je(e),Bt,Gt,xe]})),M!=null||(M=_e({name:"sdf-shader",bits:[Ne,$e(e),Mt,Dt,be]})),super({glProgram:M,gpuProgram:B,resources:{localUniforms:t,batchSamplers:Qe(e)}})}}class At extends tt{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class Ae{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);ce(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);ce(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,n=Je.getFont(e.text,e._style);r.clear(),n.distanceField.type!=="none"&&(r.customShader||(r.customShader=new zt(this._renderer.limits.maxBatchableTextures)));const s=Ze.graphemeSegmenter(e.text),a=e._style;let o=n.baseLineOffset;const u=et(s,a,n,!0),l=a.padding,h=u.scale;let d=u.width,c=u.height+u.offsetY;a._stroke&&(d+=a._stroke.width/h,c+=a._stroke.width/h),r.translate(-e._anchor._x*d-l,-e._anchor._y*c-l).scale(h,h);const f=n.applyFillAsTint?a._fill.color:16777215;let g=n.fontMetrics.fontSize,x=n.lineHeight;a.lineHeight&&(g=a.fontSize/h,x=a.lineHeight/h);let _=(x-g)/2;_-n.baseLineOffset<0&&(_=0);for(let b=0;b<u.lines.length;b++){const S=u.lines[b];for(let T=0;T<S.charPositions.length;T++){const y=S.chars[T],w=n.chars[y];if(w!=null&&w.texture){const O=w.texture;r.texture(O,f||"black",Math.round(S.charPositions[T]+w.xOffset),Math.round(o+w.yOffset+_),O.orig.width,O.orig.height)}}o+=x}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new At;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,n=H.get(`${r}-bitmap`),{a:s,b:a,c:o,d:u}=e.groupTransform,l=Math.sqrt(s*s+a*a),h=Math.sqrt(o*o+u*u),d=(Math.abs(l)+Math.abs(h))/2,c=n.baseRenderedFontSize/e._style.fontSize,f=d*n.distanceField.range*(1/c);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}Ae.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"bitmapText"};function ce(i,e){e.groupTransform=i.groupTransform,e.groupColorAlpha=i.groupColorAlpha,e.groupColor=i.groupColor,e.groupBlendMode=i.groupBlendMode,e.globalDisplayStatus=i.globalDisplayStatus,e.groupTransform=i.groupTransform,e.localDisplayStatus=i.localDisplayStatus,e.groupAlpha=i.groupAlpha,e._roundPixels=i._roundPixels}class kt extends ve{constructor(e){super(),this.generatingTexture=!1,this.currentKey="--",this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}}function K(i,e){const{texture:t,bounds:r}=i,n=e._style._getFinalPadding();rt(r,e._anchor,t);const s=e._anchor._x*n*2,a=e._anchor._y*n*2;r.minX-=n-s,r.minY-=n-a,r.maxX-=n-s,r.maxY-=n-a}class ke{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e).catch(s=>{console.error(s)}),e._didTextUpdate=!1,K(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let n=this._renderer.htmlText.getTexturePromise(e);r&&(n=n.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=n,t.currentKey=e.styleKey,t.texture=await n;const s=e.renderGroup||e.parentRenderGroup;s&&(s.structureDidChange=!0),t.generatingTexture=!1,K(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new kt(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=P.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}ke.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"htmlText"};function It(){const{userAgent:i}=q.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(i)}const Ot=new me;function Ie(i,e,t,r){const n=Ot;n.minX=0,n.minY=0,n.maxX=i.width/r|0,n.maxY=i.height/r|0;const s=v.getOptimalTexture(n.width,n.height,r,!1);return s.source.uploadMethodId="image",s.source.resource=i,s.source.alphaMode="premultiply-alpha-on-upload",s.frame.width=e/r,s.frame.height=t/r,s.source.emit("update",s.source),s.updateUvs(),s}function Et(i,e){const t=e.fontFamily,r=[],n={},s=/font-family:([^;"\s]+)/g,a=i.match(s);function o(u){n[u]||(r.push(u),n[u]=!0)}if(Array.isArray(t))for(let u=0;u<t.length;u++)o(t[u]);else o(t);a&&a.forEach(u=>{const l=u.split(":")[1].trim();o(l)});for(const u in e.tagStyles){const l=e.tagStyles[u].fontFamily;o(l)}return r}async function Vt(i){const t=await(await q.get().fetch(i)).blob(),r=new FileReader;return await new Promise((s,a)=>{r.onloadend=()=>s(r.result),r.onerror=a,r.readAsDataURL(t)})}async function Lt(i,e){const t=await Vt(e);return`@font-face {
        font-family: "${i.fontFamily}";
        font-weight: ${i.fontWeight};
        font-style: ${i.fontStyle};
        src: url('${t}');
    }`}const V=new Map;async function Wt(i){const e=i.filter(t=>H.has(`${t}-and-url`)).map(t=>{if(!V.has(t)){const{entries:r}=H.get(`${t}-and-url`),n=[];r.forEach(s=>{const a=s.url,u=s.faces.map(l=>({weight:l.weight,style:l.style}));n.push(...u.map(l=>Lt({fontWeight:l.weight,fontStyle:l.style,fontFamily:t},a)))}),V.set(t,Promise.all(n).then(s=>s.join(`
`)))}return V.get(t)});return(await Promise.all(e)).join(`
`)}function Yt(i,e,t,r,n){const{domElement:s,styleElement:a,svgRoot:o}=n;s.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${i}</div>`,s.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),a.textContent=r;const{width:u,height:l}=n.image;return o.setAttribute("width",u.toString()),o.setAttribute("height",l.toString()),new XMLSerializer().serializeToString(o)}function Ht(i,e){const t=Te.getOptimalCanvasAndContext(i.width,i.height,e),{context:r}=t;return r.clearRect(0,0,i.width,i.height),r.drawImage(i,0,0),t}function Kt(i,e,t){return new Promise(async r=>{t&&await new Promise(n=>setTimeout(n,100)),i.onload=()=>{r()},i.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,i.crossOrigin="anonymous"})}class Oe{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===X.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(n=>(this._activeTextures[t].texture=n,n));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t,r;return(r=(t=this._activeTextures[e])==null?void 0:t.usageCount)!=null?r:null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{L("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:n,textureStyle:s}=e,a=k.get(Re),o=Et(t,r),u=await Wt(o),l=dt(t,r,u,a),h=Math.ceil(Math.ceil(Math.max(1,l.width)+r.padding*2)*n),d=Math.ceil(Math.ceil(Math.max(1,l.height)+r.padding*2)*n),c=a.image,f=2;c.width=(h|0)+f,c.height=(d|0)+f;const g=Yt(t,r,n,u,a);await Kt(c,g,It()&&o.length>0);const x=c;let _;this._createCanvas&&(_=Ht(c,n));const b=Ie(_?_.canvas:x,c.width-f,c.height-f,n);return s&&(b.source.style=s),this._createCanvas&&(this._renderer.texture.initSource(b.source),Te.returnCanvasAndContext(_)),k.return(a),b}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{L("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){v.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}Oe.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"htmlText"};class Xt extends ve{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)>0?e.decreaseReferenceCount(this.currentKey):this.texture&&e.returnTexture(this.texture),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}}class Ee{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const n=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==n)&&this._updateGpuText(e),e._didTextUpdate=!1,K(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Xt(this._renderer);return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Ee.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"text"};class Ve{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,n){var c;typeof e=="string"&&(Z("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof ee||(e.style=new ee(e.style)),e.textureStyle instanceof Y||(e.textureStyle=new Y(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:s,style:a,textureStyle:o}=e,u=(c=e.resolution)!=null?c:this._renderer.resolution,{frame:l,canvasAndContext:h}=E.getCanvasAndContext({text:s,style:a,resolution:u}),d=Ie(h.canvas,l.width,l.height,u);if(o&&(d.source.style=o),a.trim&&(l.pad(a.padding),d.frame.copyFrom(l),d.frame.scale(1/u),d.updateUvs()),a.filters){const f=this._applyFilters(d,a.filters);return this.returnTexture(d),E.returnCanvasAndContext(h),f}return this._renderer.texture.initSource(d._source),E.returnCanvasAndContext(h),d}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",v.returnTexture(e,!0)}renderTextToCanvas(){Z("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t,r;return(r=(t=this._activeTextures[e])==null?void 0:t.usageCount)!=null?r:0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,n=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),n}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}Ve.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"canvasText"};m.add(Ce);m.add(Pe);m.add(Ue);m.add(nt);m.add(Fe);m.add(Me);m.add(Ge);m.add(Ve);m.add(Ee);m.add(Ae);m.add(Oe);m.add(ke);m.add(ze);m.add(De);m.add(Se);m.add(we);
//# sourceMappingURL=webworkerAll-BN6yRnaY.js.map
