const abortSignal = (controller: AbortController) => {
  if (controller) controller.abort()
}

export default abortSignal