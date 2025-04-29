import { defineStorage } from "@aws-amplify/backend";

const AMPLIFY_GEN_1_ENV_NAME = process.env.AMPLIFY_GEN_1_ENV_NAME ?? "sandbox";

export const storage = defineStorage({ name: `testrefactorstorage66aaab78025d420d93475d1ebbcc6c6d9-${AMPLIFY_GEN_1_ENV_NAME}`, access: allow => ({
        "public/*": [allow.guest.to(["read"]), allow.authenticated.to(["write", "read", "delete"])],
        "protected/{entity_id}/*": [allow.authenticated.to(["write", "read", "delete"])],
        "private/{entity_id}/*": [allow.authenticated.to(["write", "read", "delete"])]
    }) });
