function getThrottling(pointerEventsThrottling, userCount) {
  let tmpOut = pointerEventsThrottling[0];
  let lastDistToUserCount = userCount - tmpOut.fromUserCount;
  if (lastDistToUserCount < 0) lastDistToUserCount = Number.MAX_VALUE;
  for (const el of pointerEventsThrottling) {
    const distToUserCount = userCount - el.fromUserCount;
    if (el.fromUserCount <= userCount && distToUserCount <= lastDistToUserCount) {
      tmpOut = el;
      lastDistToUserCount = distToUserCount;
    }
  }
  return { minDistDelta: tmpOut.minDistDelta, minTimeDelta: 1e3 * (1 / tmpOut.maxFreq) };
}

export { getThrottling };
//# sourceMappingURL=ConfigService.utils-DxoHktcq.mjs.map
