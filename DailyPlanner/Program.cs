using DailyPlanner.Data;
using DailyPlanner.Data.DataProviders;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DailyPlanner.Common.Interfaces;

using System.Diagnostics;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using AutoMapper;
using DailyPlanner.Helpers.AutoMapper;

Stopwatch sw = new System.Diagnostics.Stopwatch();
sw.Start();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<NotebooksDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<UsersDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddEntityFrameworkStores<UsersDbContext>()
    .AddUserManager<UserManager<IdentityUser>>();
builder.Services.AddRazorPages(pages =>
{
    pages.Conventions.AuthorizePage("/Notes");
});
builder.Services.AddControllers();
builder.Services.AddScoped<IDailyPlannerDataProvider, DailyPlannerDataProvider>();
builder.Services.AddScoped<INotebooksDataProvider, NotebooksDataProvider>();
builder.Services.AddSingleton(AutoMapperConfiguration.GetConfiguredMapper());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
#region ConfigureServices

#endregion

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.MapControllers();
app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
sw.Stop();
Debug.WriteLine($"Finished configuring in {sw.Elapsed}");
sw.Start();
app.Run();
