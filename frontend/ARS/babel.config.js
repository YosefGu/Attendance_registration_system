module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Use for Expo projects
    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env", // This should match the import statement
        "path": ".env",       // Path to your .env file
      }]
    ]
  };
};
