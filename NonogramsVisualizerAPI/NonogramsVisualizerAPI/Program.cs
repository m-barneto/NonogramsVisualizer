using NonogramsVisualizerAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => options.AddDefaultPolicy(builder => builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials()));
builder.Services.AddControllers();

var app = builder.Build();

app.UseCors();

app.MapControllers();

NonogramsDriver.getInstance();

app.Run();
