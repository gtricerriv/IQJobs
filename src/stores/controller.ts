import axios from 'axios';

// Mapa para asociar el nombre del controlador con su respectivo URI base
const baseUriMap:any = {
    'PlanController': 'https://base-uri-for-plan-controller',
    'RoleController': 'https://base-uri-for-role-controller',
    'ViewController': 'https://base-uri-for-view-controller',
    'UserController': 'https://base-uri-for-user-controller',
    'TransactionController': 'https://base-uri-for-transaction-controller',
    'JobController': 'https://base-uri-for-job-controller',
    'ProfileController': 'https://base-uri-for-profile-controller',
    'TipsController': 'https://base-uri-for-tips-controller',
    'CrawlerController': 'https://base-uri-for-crawler-controller'
};

const handleResponse = (statusCode: number, data: any) => {
    return { statusCode, data };
};

const baseEndpoint = 'https://{{controllerName}}-7mlffi3t2a-uc.a.run.app';

export async function performCRUDOperation(operation: string, controllerName: string, itemId?: string, requestData?: any): Promise<any> {
    let baseUrl = '';

    if (baseUriMap[controllerName]) {
        baseUrl = baseUriMap[controllerName];
    } else {
        baseUrl = baseEndpoint.replace('{{controllerName}}', controllerName.toLowerCase());
    }

    try {
        let response;
        switch (operation) {
            case 'post':
                response = await axios.post(baseUrl, requestData);
                break;
            case 'get':
                response = await axios.get(`${baseUrl}/${controllerName.toLowerCase()}/${itemId}`);
                break;
            case 'put':
                response = await axios.put(`${baseUrl}/${controllerName.toLowerCase()}/${itemId}`, requestData);
                break;
            case 'delete':
                response = await axios.delete(`${baseUrl}/${controllerName.toLowerCase()}/${itemId}`);
                break;
            default:
                throw new Error('Operación no reconocida');
        }

        return handleResponse(response.status, response.data);
    } catch (error:any) {
        return handleResponse(500, { error: error.message });
    }
}

const controllerNameMap:any = {
    'PlanController': {
        'post': 'createPlanRoute',
        'put': 'updatePlanRoute',
        'get': 'getPlanByIdRoute',
        'delete': 'deletePlanByIdRoute'
    },
    // Agregar los demás controladores con sus operaciones correspondientes aquí
};

const getControllerName = (controllerName: string, operation: string): string => controllerNameMap[controllerName][operation] || '';

// Ejemplo de uso con diferentes controladores y operaciones
/*const createPlanResponse = await performCRUDOperation('post', 'PlanController', 'createPlanRoute', requestData);
const getPlanResponse = await performCRUDOperation('get', 'PlanController', 'getPlanByIdRoute', '123');
const updatePlanResponse = await performCRUDOperation('put', 'PlanController', 'updatePlanRoute', '456', updateData);
const deletePlanResponse = await performCRUDOperation('delete', 'PlanController','deletePlanByIdRoute', '789');*/
