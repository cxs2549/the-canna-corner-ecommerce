export default function FormInput({ param, register }) {
  return (
    <div className="form-elem w-full md:max-w-sm">
      <div>
        <label htmlFor={param.name}>{param.name}</label>
      </div>
      <input
        id={param.name}
        type={param.type}
        value={param.value}
        {...register(param.name, { required: true })}
        className="py-2 px-2 w-full"
      />
    </div>
  )
}
