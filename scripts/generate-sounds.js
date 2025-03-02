// sound-generator.js
const { AudioContext } = require('web-audio-api');
const fs = require('fs');
const WavEncoder = require('wav-encoder');

// Create audio context
const context = new AudioContext();

// Generate Matrix rain sound
async function generateRainSound(duration = 10) {
  const sampleRate = context.sampleRate;
  const samples = duration * sampleRate;
  const buffer = context.createBuffer(1, samples, sampleRate);
  const data = buffer.getChannelData(0);

  // Create digital rain effect
  for (let i = 0; i < samples; i++) {
    // Base frequency modulation
    const time = i / sampleRate;
    const freq = 2000 + Math.sin(time * 2) * 500;
    
    // Add random droplets
    const droplet = Math.random() < 0.01 ? 
      Math.sin(time * freq) * 0.5 : 0;
    
    // Add background ambience
    const ambience = Math.random() * 0.1;
    
    // Combine effects
    data[i] = (droplet + ambience) * 0.3;
  }

  return buffer;
}

// Generate node unlock sound
async function generateUnlockSound() {
  const sampleRate = context.sampleRate;
  const duration = 0.5;
  const samples = duration * sampleRate;
  const buffer = context.createBuffer(1, samples, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;
    // Rising frequency sweep
    const freq = 1000 + (time * 2000);
    data[i] = Math.sin(time * freq) * Math.exp(-time * 8) * 0.5;
  }

  return buffer;
}

// Generate node select sound
async function generateSelectSound() {
  const sampleRate = context.sampleRate;
  const duration = 0.2;
  const samples = duration * sampleRate;
  const buffer = context.createBuffer(1, samples, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;
    // High-pitch beep with quick decay
    const freq = 2000;
    data[i] = Math.sin(time * freq) * Math.exp(-time * 20) * 0.5;
  }

  return buffer;
}

// Generate modal sounds
async function generateModalSound(isOpening) {
  const sampleRate = context.sampleRate;
  const duration = 0.3;
  const samples = duration * sampleRate;
  const buffer = context.createBuffer(1, samples, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < samples; i++) {
    const time = i / sampleRate;
    // Frequency sweep (up for opening, down for closing)
    const freq = isOpening ? 
      500 + (time * 1000) : 
      1500 - (time * 1000);
    data[i] = Math.sin(time * freq) * Math.exp(-time * 10) * 0.5;
  }

  return buffer;
}

// Convert AudioBuffer to WAV and save
async function saveBuffer(buffer, filename) {
  const wavData = {
    sampleRate: buffer.sampleRate,
    channelData: [new Float32Array(buffer.getChannelData(0))]
  };

  const encoded = await WavEncoder.encode(wavData);
  fs.writeFileSync(filename, Buffer.from(encoded));
}

// Generate all sounds
async function generateAllSounds() {
  console.log('Generating Matrix sounds...');

  const rainBuffer = await generateRainSound();
  const unlockBuffer = await generateUnlockSound();
  const selectBuffer = await generateSelectSound();
  const modalOpenBuffer = await generateModalSound(true);
  const modalCloseBuffer = await generateModalSound(false);

  // Create public/sounds directory if it doesn't exist
  if (!fs.existsSync('public/sounds')) {
    fs.mkdirSync('public/sounds', { recursive: true });
  }

  // Save all sounds
  await Promise.all([
    saveBuffer(rainBuffer, 'public/sounds/matrix-rain.wav'),
    saveBuffer(unlockBuffer, 'public/sounds/node-unlock.wav'),
    saveBuffer(selectBuffer, 'public/sounds/node-select.wav'),
    saveBuffer(modalOpenBuffer, 'public/sounds/modal-open.wav'),
    saveBuffer(modalCloseBuffer, 'public/sounds/modal-close.wav')
  ]);

  console.log('All sounds generated successfully!');
}

generateAllSounds().catch(console.error);