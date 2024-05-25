export const BASE_MODEL = [
  {
    value: 'blXL_v10.safetensors',
    label: 'blXL_v10.safetensors'
  },
  {
    value: 'natureMix_natureM20.safetensors',
    label: 'natureMix_natureM20.safetensors'
  },
];

export const LORA_MODEL = [
  {
    value: 'fruits.safetensors',
    label: 'fruits.safetensors'
  },
  {
    value: 'pixiv.safetensors',
    label: 'pixiv.safetensors'
  },
];

export const SAMPLER = [
  {
    value: 'Euler',
    label: 'Euler'
  },
  {
    value: 'Euler a',
    label: 'Euler a'
  },
  {
    value: 'LMS',
    label: 'LMS'
  },
  {
    value: 'Heun',
    label: 'Heun'
  },
  {
    value: 'DPM2',
    label: 'DPM2'
  },
  {
    value: 'DPM2 a',
    label: 'DPM2 a'
  },
  {
    value: 'DPM++ 2S a',
    label: 'DPM++ 2S a'
  },
  {
    value: 'DPM++ 2M',
    label: 'DPM++ 2M'
  },
  {
    value: 'DPM++ SDE',
    label: 'DPM++ SDE'
  },
  {
    value: 'DPM++ 2M SDE',
    label: 'DPM++ 2M SDE'
  },
  {
    value: 'DPM++ 2M SDE Heun',
    label: 'DPM++ 2M SDE Heun'
  },
  {
    value: 'DPM++ 2M SDE Heun Karras',
    label: 'DPM++ 2M SDE Heun Karras'
  },
  {
    value: 'DPM++ 2M SDE Heun Exponential',
    label: 'DPM++ 2M SDE Heun Exponential'
  },
  {
    value: 'DPM++ 3M SDE',
    label: 'DPM++ 3M SDE'
  },
  {
    value: 'DPM++ 3M SDE Karras',
    label: 'DPM++ 3M SDE Karras'
  },
  {
    value: 'DPM++ 3M SDE Exponential',
    label: 'DPM++ 3M SDE Exponential,'
  },
  {
    value: 'DPM fast',
    label: 'DPM fast'
  },
  {
    value: 'DPM adaptive',
    label: 'DPM adaptive'
  },
  {
    value: 'LMS Karras',
    label: 'LMS Karras'
  },
  {
    value: 'DPM2 Karras',
    label: 'DPM2 Karras'
  },
  {
    value: 'DPM2 a Karras',
    label: 'DPM2 a Karras'
  },
  {
    value: 'DPM++ 2S a Karras',
    label: 'DPM++ 2S a Karras'
  },
  {
    value: 'Restart',
    label: 'Restart'
  },
  {
    value: 'DDIM',
    label: 'DDIM'
  },
  {
    value: 'PLMS',
    label: 'PLMS'
  },
  {
    value: 'UniPC',
    label: 'UniPC'
  }
];

export const BASE_PARAMS = {
  negative_prompt: "",
  styles: [
    ""
  ],
  seed: -1,
  subseed: -1,
  subseed_strength: 0,
  seed_resize_from_h: -1,
  seed_resize_from_w: -1,
  sampler_name: "Euler a",
  batch_size: 1,
  n_iter: 1,
  steps: 20,
  cfg_scale: 7,
  width: 512,
  height: 512,
  restore_faces: true,
  tiling: true,
  do_not_save_samples: false,
  do_not_save_grid: false,
  eta: 0,
  denoising_strength: 0,
  s_min_uncond: 0,
  s_churn: 0,
  s_tmax: 0,
  s_tmin: 0,
  s_noise: 0,
  override_settings: {
     sd_model_checkpoint: "natureMix_natureM20.safetensors"
  },
  override_settings_restore_afterwards: true,
  refiner_checkpoint: "",
  refiner_switch_at: 0,
  disable_extra_networks: false,
  comments: {},
  enable_hr: false,
  firstphase_width: 0,
  firstphase_height: 0,
  hr_scale: 2,
  hr_upscaler: "",
  hr_second_pass_steps: 0,
  hr_resize_x: 0,
  hr_resize_y: 0,
  hr_checkpoint_name: "",
  hr_sampler_name: "",
  hr_prompt: "",
  hr_negative_prompt: "",
  sampler_index: "Euler a",
  script_name: "",
  script_args: [],
  send_images: true,
  save_images: false,
  alwayson_scripts: {
    // controlnet: {
    //   args: [
    //     {
    //       enabled: true,
    //       model: "ControlNet v1.1.410",
    //       module: "tile_resample",
    //       weight: 0.85,
    //       image: "",
    //       resize_mode: 0,
    //       lowvram: true,
    //       processor_res: 0,
    //       threshold_a: 0,
    //       threshold_b: 0,  
    //       guidance_end: 0.75,
    //       guidance_start: 0.25,    
    //       pixel_perfect: false, 
    //       control_mode: 0
    //     }
    //   ]
    // }
  }
}