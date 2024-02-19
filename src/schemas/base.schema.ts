import { z } from "zod";

export default z.object({
    id: z
        .bigint()
        .positive()
        .transform((id) => id.toLocaleString()),
});