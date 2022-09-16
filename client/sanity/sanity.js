import sanityClient from "@sanity/client";
// import { imageUrlBuilder } from "@sanity/image-url/lib/types/builder";

const client = sanityClient({
    projectId: "j1vbdrg2",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
})

// const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;