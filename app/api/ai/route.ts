export async function POST(req: Request) {

  try {

    const body = await req.json()

    const question = body.question

    if (!question || question.trim() === "") {
      return Response.json({
        reply: "Please enter a matchup like Duke vs UNC."
      })
    }

    return Response.json({
      reply: `AI matchup analysis for: ${question}. Full analytics engine coming soon.`
    })

  } catch (error) {

    return Response.json({
      reply: "Error processing matchup."
    })

  }

}