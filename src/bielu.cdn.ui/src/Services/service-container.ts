import {ManagementClient} from "./umbraco/generated/api.generated.clients";

export const serviceContainer = {
 managmentApiClient: new ManagementClient()
};