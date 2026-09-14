module.exports = function (api) {
  api.cache(true);
  return {
    // NativeWind temporarily disabled: v2 babel plugin is incompatible with
    // the PostCSS version hoisted by Expo SDK 57 (async plugin error).
    // Re-enable with NativeWind v4+ once stable: plugins: ['nativewind/babel'].
    presets: ['babel-preset-expo'],
  };
};

