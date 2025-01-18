exports.ids = [2];
exports.modules = {

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("6b36b8a4", content, true, context)
};

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThreeModel_vue_vue_type_style_index_0_id_4ff7014d_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThreeModel_vue_vue_type_style_index_0_id_4ff7014d_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThreeModel_vue_vue_type_style_index_0_id_4ff7014d_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThreeModel_vue_vue_type_style_index_0_id_4ff7014d_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_3_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_3_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_3_oneOf_1_2_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ThreeModel_vue_vue_type_style_index_0_id_4ff7014d_prod_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".three-container[data-v-4ff7014d]{height:100vh;left:0;position:absolute;top:0;width:100%}", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ThreeModel.vue?vue&type=template&id=4ff7014d&scoped=true
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('client-only', [_c('div', {
    ref: "canvasContainer",
    staticClass: "three-container absolute"
  })]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./components/ThreeModel.vue?vue&type=template&id=4ff7014d&scoped=true

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/ThreeModel.vue?vue&type=script&lang=js

/* harmony default export */ var ThreeModelvue_type_script_lang_js = ({
  name: 'ThreeModel',
  setup() {
    const canvasContainer = Object(external_vue_["ref"])(null);
    Object(external_vue_["onMounted"])(() => {
      // Import necessary Three.js modules
      __webpack_require__.e(/* import() */ 7).then(__webpack_require__.t.bind(null, 68, 7)).then(THREE => {
        const {
          Scene,
          PerspectiveCamera,
          WebGLRenderer,
          AmbientLight,
          DirectionalLight
        } = THREE;

        // Dynamically import FBXLoader and OrbitControls
        Promise.all([__webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(null, 78)), __webpack_require__.e(/* import() */ 6).then(__webpack_require__.bind(null, 76))]).then(([FBXLoaderModule, OrbitControlsModule]) => {
          const FBXLoader = FBXLoaderModule.FBXLoader;
          const OrbitControls = OrbitControlsModule.OrbitControls;

          // Initialize the scene, camera, and renderer
          const scene = new Scene();
          const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new WebGLRenderer({
            antialias: true
          });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0xffffff, 1); // Set background color to white

          // Add the canvas to the DOM
          canvasContainer.value.appendChild(renderer.domElement);

          // Add lights to the scene
          const ambientLight = new AmbientLight(0x404040, 20); // Soft white ambient light
          scene.add(ambientLight);
          const directionalLight = new DirectionalLight(0xffffff, 1); // Bright directional light
          directionalLight.position.set(5, 5, 7.5);
          scene.add(directionalLight);

          // Load the FBX model
          const loader = new FBXLoader();
          loader.load('models/femalest.fbx', object => {
            // Scale the model
            object.scale.set(0.07, 0.07, 0.07); // Adjust the scale to make it smaller
            object.position.set(0, -6, 0);

            // Add the animation mixer
            const mixer = new THREE.AnimationMixer(object);

            // Traverse through the model to apply any additional settings
            object.traverse(child => {
              if (child.isMesh) {
                child.castShadow = true; // Optional: Enable shadow casting
              }
              if (child.animations && child.animations.length > 0) {
                child.animations.forEach(animation => {
                  mixer.clipAction(animation).play(); // Play the first animation
                });
              }
            });
            scene.add(object);

            // Adjust camera position to frame the model
            camera.position.set(0, 0, 10);

            // Render loop with animation updates
            const animate = () => {
              requestAnimationFrame(animate);
              mixer.update(0.01); // Update the animation
              renderer.render(scene, camera);
            };
            animate();
          });

          // Add OrbitControls for interactivity
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;

          // Handle window resizing
          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        });
      });
    });
    return {
      canvasContainer
    };
  }
});
// CONCATENATED MODULE: ./components/ThreeModel.vue?vue&type=script&lang=js
 /* harmony default export */ var components_ThreeModelvue_type_script_lang_js = (ThreeModelvue_type_script_lang_js); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/ThreeModel.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(70)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_ThreeModelvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "4ff7014d",
  "f1ffc6ac"
  
)

/* harmony default export */ var ThreeModel = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=three-model.js.map