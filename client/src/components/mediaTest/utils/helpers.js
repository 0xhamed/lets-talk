export default function() {
  this.lock = async () => {
    const { gHelpers, gState } = this.props;
    const {
      audioEnabled,
      videoEnabled,
      audioSelectedDevice,
      videoSelectedDevice
    } = gState;

    const constraints = {};
    if (audioEnabled)
      constraints.audio = { deviceId: audioSelectedDevice.device.deviceId };
    if (videoEnabled)
      constraints.video = { deviceId: videoSelectedDevice.device.deviceId };

    const stream = await navigator.mediaDevices
      .getUserMedia(constraints)
      .catch(() => {});

    if (stream) {
      gHelpers.setStream(stream);
      this.setState({ inputsLocked: true });
    }
  };

  this.handleStart = async () => {
    await this.lock();
    this.props.gHelpers.setActivePage('room');
  };
}
