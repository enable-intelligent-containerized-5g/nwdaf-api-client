import yaml from "js-yaml";

interface Config {
    nwdafMtlfUri: string;
    nwdafAnlfUri: string;
}

let apiClientConfig: Config | null = null;

export const loadConfig = async (): Promise<Config | null> => {
    if (apiClientConfig !== null) {
        return apiClientConfig;
    }

    try {
        // get the configfile
        const configFile = import.meta.env.VITE_NWDAF_API_CLIENT_CONFIG_FILE || "apicfg.yaml";
        console.log("Config file:", configFile);

        // Carga el archivo YAML desde el directorio `public`
        const response = await fetch(`${configFile}`);
        if (!response.ok) {
            throw new Error(`Error loading the config file: ${response.statusText}`);
        }

        // Convierte el YAML en un objeto TypeScript
        const text = await response.text();
        apiClientConfig = yaml.load(text) as Config;
        console.log("config: ", apiClientConfig)

        return apiClientConfig;
    } catch (error) {
        console.error("Error reading the config file:", error);
        return null
    }
};

export const getConfig = (): Config | null => apiClientConfig;

