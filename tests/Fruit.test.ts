// @ts-nocheck

import {createTestContext} from './__helpers'

const ctx = createTestContext()

it('ensures that a Fruit can be created and Updated and Deleted and Fetched', async ()=>{
    // Create a new Draft

     await ctx.client.request(`
    mutation{
        createFruit(
          name:"Apple",
          description:"apple juice",
          limit:2
          )
          {
            name
            description
            limit
        }
    }
    `)expect(200)

    // // Snapshot that draft and expect `published` to be false
    // expect(200)
    
     await ctx.client.request(`
    mutation{
        createFruit(
          name:"abc",
          description:"three",
          limit:2
          )
          {
            name
            description
            limit
        }
    }
    `)

    // Snapshot that draft and expect `published` to be false
    expect(500)

    // Update the Fruit
    const updateFruit = await ctx.client.request(`
    mutation{
       updateFruit(
        fruitId:"63d287dc14c31ea43e0a560b",
        name:"jumbo"
       ){
        name
       }
    `
    )expect(200)

//     // Snapshot the published draft and expect `published` to be true
//     expect(updateFruit).toMatchInlineSnapshot(`
// {
//   "updateFruit": {
//     "name": "kiwi"
//   },
// }
// `)

   await ctx.client.request(`
  mutation{
    deleteFruit(
        fruitId:"63d287dc14c31ea43e0a560b"
    ){
      "deleteFruit": true
    }
}
  `
  )expect(200)

})