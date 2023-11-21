import {ManagementClient} from "./umbraco/generated/api.generated.clients.ts";

export const serviceContainer = {
 managmentApiClient: new ManagementClient()
};