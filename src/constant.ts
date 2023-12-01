export const DEFAULT_PROJECT_PATH = './projects';
export const DEFAULT_SOURCE_PATH = 'src';

export const ERRORS = {
    "PROJECT_NOT_FOUND" : {
        "error": 'Project not found. Please initialize a project.',
        "description": 'Bad Request'
    },
    "PROJECT_ALREADY_INITIALIZED" : {
        "error": 'Project is already created with given name. Please change working directory or project name.',
        "description": 'Bad Request'
    },
    "CONTENT_TYPE_ALREADY_INITIALIZED" : {
        "error": 'Content type has already initialized.',
        "description": 'Bad Request'
    }
}