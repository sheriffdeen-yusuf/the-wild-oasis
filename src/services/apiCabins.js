import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}
// console.log(await getCabins());
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
}

// check end of file to see the original code for createCabin
export async function createEditCabin(newCabin, id) {
  // https://unejjdbzadqyijqivwqb.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  // 1. create/edit  cabin
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // for create

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id); //for edit

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  //   2. upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  // 3. Delete  the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "cabins image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

//   // https://unejjdbzadqyijqivwqb.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg

//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
//   // 1. create cabin
//   //   use .single() to the newly inserted data is returned from the api
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])
//     .select()
//     .single();
//   if (error) {
//     console.error(error);
//     throw new Error("cabins could not be deleted");
//   }

//   //   2. upload image
//   const { error: storageError } = await supabase.storage
//     .from("cabins")
//     .upload(imageName, newCabin.image);

//   // 3. Delete  the cabin IF there was an error uploading image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "cabins image could not be uploaded and cabin was not created"
//     );
//   }
//   return data;
// }
